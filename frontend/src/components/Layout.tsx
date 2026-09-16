import {styles} from '../assets/dummyStyles.ts'
import Navbar from './Navbar'
import type { LayoutProps} from '../types'

const Layout = ({onLogout, user}: LayoutProps) => {
  return (
    <div className={styles.layout.root}>
       <Navbar user={user} onLogout={onLogout} />
    </div>
  )
}

export default Layout
