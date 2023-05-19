import * as React from 'react';
import { LogoWrapper, SiteName, LogoImage, LogoLink } from './LogoStyle';

const Logo = () => {
  return (
    <LogoLink to="">
      <LogoWrapper>
        <LogoImage src={'src/assets/logos/logo-dark.png'} alt={'logo'} />
        <SiteName>CryptoCoin</SiteName>
      </LogoWrapper>
    </LogoLink>
  );
};

export default Logo;
