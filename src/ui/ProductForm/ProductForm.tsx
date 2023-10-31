import { FC, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import {
  CategoryProps,
  ImagesProps,
  ImageToUpload,
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
import { uploadFile } from '@/utils/s3Client/uploadFile'
const SelectField = dynamic(() => import('@/ui/SelectField/SelectField'), {
  ssr: false,
})

import styles from './ProductForm.module.scss'

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
  additionalImages?: ImagesProps[]
  slug: string
  description?: string
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
  product?: ProductProps
  categories: CategoryProps[]
  onValues: (formData: ProductProps) => void
  loading: boolean
}> = ({ product, categories, onValues, loading = false }) => {
  const [_loading, setLoading] = useState(loading)
  const [selectedCategory, setSelectedCategory] = useState<OptionInterface>({
    label: product?.category?.name || '',
    value: product?.category?.id || '',
  })

  const [obverseImage, setObverseImage] = useState<ImageToUpload>({
    file: null,
    ImageUrl: product?.mainImages?.obverse || null,
  })
  const [reverseImage, setReverseImage] = useState<ImageToUpload>({
    file: null,
    ImageUrl: product?.mainImages?.reverse || null,
  })
  const [isObserveImageDeleted, setIsObserveImageDeleted] =
    useState<boolean>(false)
  const [isReverseImageDeleted, setIsReverseImageDeleted] =
    useState<boolean>(false)

  const [additionalImages, setAdditionalImages] = useState<
    AdditionalImageToUpload[]
  >(
    product?.additionalImages?.length
      ? transformAdditionalImages(product.additionalImages)
      : []
  )

  const defaultValues: FormProps = useMemo(
    () => ({
      ProductName: product?.ProductName || '',
      Metal: product?.Metal || '',
      ActualMetalWeight: product?.specification[0].ActualMetalWeight || '',
      CoinWeight: product?.specification[0].CoinWeight || '',
      Diameter: product?.specification[0].Diameter || '',
      EdgeDesign: product?.specification[0].EdgeDesign || '',
      Fineness: product?.specification[0].Fineness || '',
      IraApproved: product?.specification[0].IraApproved || '',
      Series: product?.specification[0].Series || '',
      Thickness: product?.specification[0].Thickness || '',
      category: product?.category || undefined,
      mainImages: product?.mainImages || { obverse: null, reverse: null },
      additionalImages: product?.additionalImages || undefined,
      slug: product?.slug || '',
      description: product?.description || '',
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

  const deleteObverseImage = useCallback(() => {
    setObverseImage({
      file: null,
      ImageUrl: null,
    })
    setIsObserveImageDeleted(true)
  }, [])

  const deleteReverseImage = useCallback(() => {
    setReverseImage({
      file: null,
      ImageUrl: null,
    })
    setIsReverseImageDeleted(true)
  }, [])

  const deleteAdditionalImage = useCallback(
    (id: string) => {
      const filteredImages = additionalImages.filter((img) => img.id !== id)
      setAdditionalImages([...filteredImages])
    },
    [additionalImages]
  )

  const onSubmit = async (formData: FormProps) => {
    setLoading(true)
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

    /* main images */
    if (obverseImage.file) {
      const uploadedObverseImageUrl = await uploadFile(obverseImage)
      formData.mainImages.obverse = `${process.env.CLOUD_ENDPOINT}/${uploadedObverseImageUrl}`
    } else if (isObserveImageDeleted && formData.mainImages) {
      formData.mainImages.obverse = null
    }

    if (reverseImage.file) {
      const uploadedReverseImageUrl = await uploadFile(reverseImage)
      formData.mainImages.reverse = `${process.env.CLOUD_ENDPOINT}/${uploadedReverseImageUrl}`
    } else if (isReverseImageDeleted && formData.mainImages) {
      formData.mainImages.reverse = null
    }

    /* additional images */
    if (additionalImages.length > 0) {
      const uploadedAdditionalImagesUrl = []
      for (const image of additionalImages) {
        if (image.file) {
          const uploadedImageUrl = await uploadFile(image)
          if (uploadedImageUrl) {
            uploadedAdditionalImagesUrl.push({
              ImageUrl: `${process.env.CLOUD_ENDPOINT}/${
                uploadedImageUrl as string
              }`,
            })
          }
        } else {
          uploadedAdditionalImagesUrl.push({ ImageUrl: image.ImageUrl })
        }
      }

      formData.additionalImages = [...uploadedAdditionalImagesUrl]
    }
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
            <div className="col-md-6">
              <Controller
                control={control}
                name="Metal"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues()['Metal']}
                      placeholder=""
                      label="Metal"
                      error={errors['Metal']?.message}
                    />
                  )
                }}
              />
            </div>
            <div className="col-md-6">
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
            </div>
          </div>
          <ButtonPrimary type="submit" isLoading={_loading}>
            Save product
          </ButtonPrimary>
        </div>
        <div
          className={classNames('col-md-6', styles['form__upload_container'])}
        >
          <div className={classNames(styles['grid_item'], styles['obverse'])}>
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
                type="button"
                className={styles['delete_button']}
                onClick={deleteObverseImage}
              >
                Delete
              </button>
            </div>
          </div>
          <div className={classNames(styles['grid_item'], styles['reverse'])}>
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
                className={styles['delete_button']}
                onClick={deleteReverseImage}
              >
                Delete
              </button>
            </div>
          </div>
          <div
            className={classNames(styles['grid_item'], styles['additional'])}
          >
            <h5>Additional images:</h5>
            {additionalImages.length ? (
              <div className={styles['images_list']}>
                {additionalImages.map((image) => {
                  return (
                    <div key={image.id} className={styles['images_list_item']}>
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
        </div>
      </div>
    </form>
  )
}

export default ProductForm
