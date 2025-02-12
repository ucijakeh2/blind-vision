import SettingPage from '@/components/tabs/settings/SettingPage';
import { ThemeContext } from '@/app/_layout';

import backgrounds from '@/constants/backgrounds';
import layouts from '@/constants/layouts';

import { useContext } from 'react';

const Stick = () => {
  const [dark, _] = useContext(ThemeContext)

  return (
    <SettingPage 
      title='Stick'
      backgroundSource={dark ? backgrounds.darkStick : backgrounds.stick}
      layoutSource={layouts.stick}
      includeBackButton
    />
  )
}

export default Stick;