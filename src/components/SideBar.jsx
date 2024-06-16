import { Drawer } from '@mui/material'
import SideBarContent from './SideBarContent'

const SideBar = ({ openDrawer }) => {
    return (
        <Drawer
            anchor='left'
            open={openDrawer}
            hideBackdrop={true}
            ModalProps={{
                keepMounted: true
            }}
            variant='persistent'
            sx={{
                '& .MuiDrawer-paper': {
                    marginTop: '80px',
                    width: 280,
                    background: '#0f0f18',
                    borderRight: 'none',
                    height: 'calc(100vh - 67px)'
                }
            }}
        >
            <SideBarContent />
        </Drawer>
    )
}

export default SideBar