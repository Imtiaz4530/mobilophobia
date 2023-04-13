import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import Person2Icon from '@mui/icons-material/Person2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Link from "next/link";

import styles from '../styles/navbar.module.css'
import logoImage from '../public/logo.jpg'

const Navbar = () => {

return (
  <Box sx={{ display: 'flex' }}>
    <AppBar component="nav">
      <Toolbar className={styles.toolbar} >
          <Box className={styles.logoUnit} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <Image alt='LOGO' height={62} width={55} src={logoImage} />
              <Link className='global-link' href={`/`}><Typography variant="h5" component="div" sx={{ color: "#4b7fcb", letterSpacing: 8.5}}>MOBILOPHOBIA </Typography></Link>
          </Box>
        
          <Box sx={{ marginRight: 2, display: { xs: 'none', sm: 'block' } }}>
            <Link className='global-link' href={`/profile`}>
                <Button sx={{ color: '#4b7fcb', display: "flex", flexDirection: "column", gap: 1  }}> 
                    <Person2Icon />
                    <Typography sx={{ color: "#4b7fcb", fontSize: 14, textAlign: 'center', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}> Profile </Typography>
              </Button>
            </Link>
          </Box>

          <Box sx={{ marginRight: 2, display: { xs: 'none', sm: 'block' } }}>
                  <Button sx={{ color: '#4b7fcb', display: "flex", flexDirection: "column", gap: 1  }}> 
                        <ShoppingCartIcon />
                        <Typography sx={{ color: "#4b7fcb", fontSize: 14, textAlign: 'center', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}> Order </Typography>
                  </Button>
          </Box>

          <Box sx={{ marginRight: 2, display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#4b7fcb', display: "flex", flexDirection: "column", gap: 1  }}> 
                    <BoltIcon /> 
                    <Typography sx={{ color: "#4b7fcb", fontSize: 14, textAlign: 'center', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}> Battle </Typography>
              </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link className='global-link' href={`/wishlist`}>
                <Button sx={{ color: '#4b7fcb', display: "flex", flexDirection: "column", gap: 1 }}> 
                      <BookmarkAddedIcon />
                      <Typography sx={{ color: "#4b7fcb", fontSize: 14, textAlign: 'center', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}> Wishlist </Typography> 
                </Button> 
              </Link>
          </Box>
      </Toolbar>
    </AppBar>
  </Box>
)}

export default Navbar;