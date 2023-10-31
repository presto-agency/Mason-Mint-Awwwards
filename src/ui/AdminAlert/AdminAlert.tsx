import styles from './AdminAlert.module.scss'

const AdminAlert = ({ title }: { title: string }) => {
  return (
    <div className={styles['alert']}>
      <p>{title}</p>
    </div>
  )
}

export default AdminAlert
