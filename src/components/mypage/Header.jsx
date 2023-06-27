import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/ExitToApp';

//Link용
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//store 호출용
import { useUserStore } from '../store';

const Header = () => {
  const userEmail = useUserStore(state => state.userEmail)
  return (
    <div className='fixed top-0' style={{zIndex: 200}}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', backgroundColor:'white', width: '100vw', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Link to="/Main">
          <img src="/name.png" alt="logo" className="h-10 w-auto" />
          </Link>
          <Link to="/mypage" color="inherit" className="mx-2 border-purple-300 border rounded-full px-1" >
            Mypage
          </Link>
          <Link to="/myproject" color="inherit" className="mx-2 border-purple-300 border rounded-full px-1" >
            My project
          </Link>
          {/* <Link href="/myphodo" color="inherit" sx={{ ml: 2 }}>
            members
          </Link> */}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>환영합니다! {userEmail}님</span>
          <IconButton sx={{ ml: 1 }}>
            <LogoutIcon />
          </IconButton>
          <Avatar variant="outlined" size="small" sx={{ ml: 1 }}>
            A
          </Avatar>
        </div>
      </Toolbar>
    </div>
  )
}
export default Header;
