import { FC, useCallback, useMemo, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import {
  CategoryProps,
  ImagesProps,
  MainImagesProps,
  ProductProps,
  SpecificationProps,
} from '@/utils/types'
import { Controller, useForm } from 'react-hook-form'
import RCUploader from 'rc-upload'
import TextField from '@/ui/TextField/TextField'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import { OptionInterface } from '@/utils/types'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import { generateSlug } from '@/utils/string/generateSlug'
const SelectField = dynamic(() => import('@/ui/SelectField/SelectField'), {
  ssr: false,
})

import styles from './ProductForm.module.scss'
import classNames from 'classnames'

type FormProps = {
  ProductName: string
  Metal?: string
  ActualMetalWeight?: string
  CoinWeight?: string
  Diameter?: string
  EdgeDesign?: string
  Fineness?: string
  IraApproved?: string
  Series?: string
  Thickness?: string
  category?: CategoryProps
  specification?: SpecificationProps[]
  mainImages: MainImagesProps
  additionalImages: ImagesProps[]
  slug: string
  description?: string
}

type ImageToUpload = {
  file: File | null
  ImageUrl: string | null
}

type AdditionalImageToUpload =
  | {
      id: string
      file: File
      nameKeyToUpload: string
      ImageUrl: string
    }
  | {
      id: string
      file: null
      nameKeyToUpload: null
      ImageUrl: string
    }

type UploadImageResponse =
  | {
      type: 'obverse' | 'reverse'
      url: string
    }
  | {
      type: 'additional'
      url: string
      name: string
    }

const transformAdditionalImages = (images: ImagesProps[]) => {
  const res: AdditionalImageToUpload[] = []

  images.forEach((image, index) => {
    if (image.ImageUrl) {
      res.push({
        id: `${index + 1}`,
        file: null,
        nameKeyToUpload: null,
        ImageUrl: image.ImageUrl,
      })
    }
  })

  return res
}

const ProductForm: FC<{
  product: ProductProps
  categories: CategoryProps[]
  onValues: (formData: ProductProps) => void
  loading: boolean
}> = ({ product, categories, onValues, loading = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<OptionInterface>({
    label: product.category?.name || '',
    value: product.category?.id || '',
  })

  const [obverseImage, setObverseImage] = useState<ImageToUpload>({
    file: null,
    ImageUrl: product.mainImages?.obverse || null,
  })
  const [reverseImage, setReverseImage] = useState<ImageToUpload>({
    file: null,
    ImageUrl: product.mainImages?.reverse || null,
  })

  const [additionalImages, setAdditionalImages] = useState<
    AdditionalImageToUpload[]
  >(
    product.additionalImages?.length
      ? transformAdditionalImages(product.additionalImages)
      : []
  )

  const defaultValues: FormProps = useMemo(
    () => ({
      ProductName: product.ProductName,
      Metal: product.Metal,
      ActualMetalWeight: product.specification[0].ActualMetalWeight,
      CoinWeight: product.specification[0].CoinWeight,
      Diameter: product.specification[0].Diameter,
      EdgeDesign: product.specification[0].EdgeDesign,
      Fineness: product.specification[0].Fineness,
      IraApproved: product.specification[0].IraApproved,
      Series: product.specification[0].Series,
      Thickness: product.specification[0].Thickness,
      category: product.category,
      mainImages: product.mainImages,
      additionalImages: product.additionalImages,
      slug: product.slug,
      description: product.description || '',
    }),
    [product]
  )

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormProps>({
    defaultValues,
  })

  const categoriesOptions = useMemo(() => {
    return categories.map((category: CategoryProps) => {
      return {
        label: category.name || '',
        value: category.id || '',
      }
    })
  }, [categories])

  const handleCategoryChange = useCallback(
    (category: OptionInterface | null) => {
      setValue('category', {
        name: category?.label,
        id: category?.value,
      })
      setSelectedCategory(category as OptionInterface)
    },
    [setValue, setSelectedCategory]
  )

  const uploadProps = {
    onError: (error: Error) => {
      console.error(error)
    },
    action: '',
    accept: 'image/jpeg, image/png',
  }

  const resetObverseImage = useCallback(() => {
    const obj = {
      file: null,
      ImageUrl: product.mainImages.obverse || null,
    }

    setObverseImage(obj)
  }, [product.mainImages?.obverse])

  const resetReverseImage = useCallback(() => {
    const obj = {
      file: null,
      ImageUrl: product.mainImages.reverse || null,
    }

    setReverseImage(obj)
  }, [product.mainImages?.reverse])

  const deleteObverseImage = useCallback(() => {
    setObverseImage({
      file: null,
      ImageUrl: null,
    })
  }, [])

  const deleteReverseImage = useCallback(() => {
    setReverseImage({
      file: null,
      ImageUrl: null,
    })
  }, [])

  const deleteAdditionalImage = useCallback(
    (id: string) => {
      const filteredImages = additionalImages.filter((img) => img.id !== id)
      setAdditionalImages([...filteredImages])
    },
    [additionalImages]
  )

  const onSubmit = async (formData: FormProps) => {
    formData.specification = [
      {
        ActualMetalWeight: formData.ActualMetalWeight || '',
        CoinWeight: formData.CoinWeight || '',
        Diameter: formData.Diameter || '',
        Thickness: formData.Thickness || '',
        EdgeDesign: formData.EdgeDesign || '',
        Series: formData.Series || '',
        Fineness: formData.Fineness || '',
        IraApproved: formData.IraApproved || '',
      },
    ]

    delete formData.ActualMetalWeight
    delete formData.CoinWeight
    delete formData.Diameter
    delete formData.Thickness
    delete formData.EdgeDesign
    delete formData.Series
    delete formData.Fineness
    delete formData.IraApproved
    formData.slug = generateSlug(formData.slug)

    formData.mainImages = {
      obverse: obverseImage.ImageUrl,
      reverse: reverseImage.ImageUrl,
    }

    const additionalImagesHash = new Map<string, string>()
    const fd = new FormData()

    if (obverseImage.file) {
      fd.append('obverseImage', obverseImage.file)
    }

    if (reverseImage.file) {
      fd.append('reverseImage', reverseImage.file)
    }

    for (const image of additionalImages) {
      additionalImagesHash.set(
        image.nameKeyToUpload ? image.nameKeyToUpload : image.id,
        image.ImageUrl
      )
      if (image.file) {
        fd.append(`additionalImages`, image.file)
      }
    }

    if (
      fd.has('obverseImage') ||
      fd.has('reverseImage') ||
      fd.has('additionalImages')
    ) {
      await axios
        .post(`/api/files/${product.id}/upload`, fd)
        .then(({ data: { files = [], success = false, error = null } }) => {
          if (error) {
            console.log(error)
          }

          if (success) {
            Object.values<UploadImageResponse>(files).forEach((file) => {
              switch (file.type) {
                case 'obverse':
                  formData.mainImages.obverse = file.url
                  break
                case 'reverse':
                  formData.mainImages.reverse = file.url
                  break
                case 'additional':
                  additionalImagesHash.set(file.name, file.url)
                  break
                default:
                  break
              }
            })
          }
        })
        .catch((error) => console.error(error))
    }
    const result: { ImageUrl: string }[] = []
    additionalImages.forEach((image) => {
      if (image.nameKeyToUpload) {
        if (additionalImagesHash.has(image.nameKeyToUpload)) {
          result.push({
            ImageUrl: additionalImagesHash.get(image.nameKeyToUpload)!,
          })
          return
        }
      }
      result.push({ ImageUrl: image.ImageUrl })
      return
    })

    formData.additionalImages = [...result]
    ;(await onValues) && onValues(formData as ProductProps)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <div className="row">
        <div className="col-md-6">
          <Controller
            control={control}
            name="ProductName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  value={getValues().ProductName}
                  placeholder="ProductOld name"
                  label="ProductOld should have a name*"
                  error={errors['ProductName']?.message}
                />
              )
            }}
          />
          <Controller
            control={control}
            name="slug"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  value={getValues().slug}
                  placeholder="Slug"
                  label="ProductOld should have a name*"
                  error={errors['slug']?.message}
                  readOnly
                />
              )
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  value={getValues().description}
                  placeholder="Description"
                  label="ProductOld can have a some description*"
                  error={errors['description']?.message}
                />
              )
            }}
          />
          <div className="row">
            <div className="col-md-6">
              <Controller
                control={control}
                name="ActualMetalWeight"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['ActualMetalWeight']}
                      placeholder=""
                      label="Actual Metal Weight"
                      error={errors['ActualMetalWeight']?.message}
                    />
                  )
                }}
              />
            </div>
            <div className="col-md-6">
              <Controller
                control={control}
                name="Fineness"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['Fineness']}
                      placeholder=""
                      label="Fineness"
                      error={errors['Fineness']?.message}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Controller
                control={control}
                name="CoinWeight"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['CoinWeight']}
                      placeholder=""
                      label="Weight"
                      error={errors['CoinWeight']?.message}
                    />
                  )
                }}
              />
            </div>
            <div className="col-md-6">
              <Controller
                control={control}
                name="Diameter"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['Diameter']}
                      placeholder=""
                      label="Diameter"
                      error={errors['Diameter']?.message}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Controller
                control={control}
                name="Thickness"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['Thickness']}
                      placeholder=""
                      label="Thickness"
                      error={errors['Thickness']?.message}
                    />
                  )
                }}
              />
            </div>
            <div className="col-md-6">
              <Controller
                control={control}
                name="EdgeDesign"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['EdgeDesign']}
                      placeholder=""
                      label="Edge Design"
                      error={errors['EdgeDesign']?.message}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Controller
                control={control}
                name="Series"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['Series']}
                      placeholder=""
                      label="Series"
                      error={errors['Series']?.message}
                    />
                  )
                }}
              />
            </div>
            <div className="col-md-6">
              <Controller
                control={control}
                name="IraApproved"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['IraApproved']}
                      placeholder=""
                      label="IRA Approved"
                      error={errors['IraApproved']?.message}
                    />
                  )
                }}
              />
            </div>
          </div>
          <Controller
            control={control}
            name="category"
            render={({ field }) => {
              return (
                <SelectField
                  {...field}
                  placeholder="Select Categories"
                  label="Category*"
                  error={errors['category']?.message}
                  options={categoriesOptions}
                  onChange={handleCategoryChange}
                  selectedOption={selectedCategory}
                />
              )
            }}
          />
          <ButtonPrimary type="submit" isLoading={loading}>
            Save product
          </ButtonPrimary>
        </div>
        <div
          className={classNames('col-md-6', styles['form__upload_container'])}
        >
          {process.env.NODE_ENV === 'development' ? (
            <>
              <div
                className={classNames(styles['grid_item'], styles['obverse'])}
              >
                <h5>Obverse:</h5>
                {obverseImage.ImageUrl &&
                !obverseImage.ImageUrl.includes('www.masonmint.com') ? (
                  <BackgroundImage
                    src={obverseImage.ImageUrl}
                    alt="Alt"
                    className={styles['form__thumbs_item']}
                  />
                ) : (
                  <RCUploader
                    {...uploadProps}
                    beforeUpload={async (file: File) => {
                      const imageToAdd = {
                        file: file,
                        ImageUrl: URL.createObjectURL(file),
                      }
                      setObverseImage(imageToAdd)
                    }}
                    className={styles['form__upload_item']}
                  >
                    Choose, or drag the file
                  </RCUploader>
                )}
                <div className={styles['buttons']}>
                  <button
                    className={styles['reset_button']}
                    type="button"
                    onClick={resetObverseImage}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className={styles['delete_button']}
                    onClick={deleteObverseImage}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                className={classNames(styles['grid_item'], styles['reverse'])}
              >
                <h5>Reverse:</h5>

                {reverseImage.ImageUrl &&
                !reverseImage.ImageUrl.includes('www.masonmint.com') ? (
                  <BackgroundImage
                    src={reverseImage.ImageUrl}
                    alt="Alt"
                    className={styles['form__thumbs_item']}
                  />
                ) : (
                  <RCUploader
                    {...uploadProps}
                    beforeUpload={async (file: File) => {
                      const imageToAdd = {
                        file: file,
                        ImageUrl: URL.createObjectURL(file),
                      }
                      setReverseImage(imageToAdd)
                    }}
                    className={styles['form__upload_item']}
                  >
                    Choose, or drag the file
                  </RCUploader>
                )}
                <div className={styles['buttons']}>
                  <button
                    type="button"
                    className={styles['reset_button']}
                    onClick={resetReverseImage}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className={styles['delete_button']}
                    onClick={deleteReverseImage}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                className={classNames(
                  styles['grid_item'],
                  styles['additional']
                )}
              >
                <h5>Additional images:</h5>
                {additionalImages.length ? (
                  <div className={styles['images_list']}>
                    {additionalImages.map((image) => {
                      return (
                        <div
                          key={image.id}
                          className={styles['images_list_item']}
                        >
                          <BackgroundImage
                            src={image.ImageUrl}
                            alt="Alt"
                            className={styles['image']}
                          />
                          <div
                            className={styles['delete']}
                            onClick={() => deleteAdditionalImage(image.id)}
                          >
                            x
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
                <RCUploader
                  {...uploadProps}
                  multiple={true}
                  beforeUpload={async (file: File & { uid: string }) => {
                    const imageToAdd = {
                      id: file.uid,
                      file: file,
                      nameKeyToUpload: file.name,
                      ImageUrl: URL.createObjectURL(file),
                    }
                    setAdditionalImages((prevSate) => [...prevSate, imageToAdd])
                  }}
                  className={styles['form__upload_item']}
                >
                  Choose, or drag the files
                </RCUploader>
              </div>
            </>
          ) : (
            <>
              <div
                className={classNames(styles['grid_item'], styles['obverse'])}
              >
                {obverseImage.ImageUrl &&
                  !obverseImage.ImageUrl.includes('www.masonmint.com') && (
                    <>
                      <h5>Obverse:</h5>
                      <BackgroundImage
                        src={obverseImage.ImageUrl}
                        alt="Alt"
                        className={styles['form__thumbs_item']}
                      />
                    </>
                  )}
              </div>
              <div
                className={classNames(styles['grid_item'], styles['reverse'])}
              >
                {reverseImage.ImageUrl &&
                  !reverseImage.ImageUrl.includes('www.masonmint.com') && (
                    <>
                      <h5>Reverse:</h5>
                      <BackgroundImage
                        src={reverseImage.ImageUrl}
                        alt="Alt"
                        className={styles['form__thumbs_item']}
                      />
                    </>
                  )}
              </div>
              <div
                className={classNames(
                  styles['grid_item'],
                  styles['additional']
                )}
              >
                {additionalImages.length ? (
                  <>
                    <h5>Additional images:</h5>
                    <div className={styles['images_list']}>
                      {additionalImages.map((image) => {
                        return (
                          <div
                            key={image.id}
                            className={styles['images_list_item']}
                          >
                            <BackgroundImage
                              src={image.ImageUrl}
                              alt="Alt"
                              className={styles['image']}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

export default ProductForm
