import SettingPage from '@/components/tabs/settings/SettingPage';
import { useContext } from 'react';

import backgrounds from '@/constants/backgrounds';
import layouts from '@/constants/layouts';

import { ThemeContext } from '@/app/_layout';

const Glasses = () => {
  const [dark, _] = useContext(ThemeContext)

  return (
    <SettingPage
      title="Glasses"
      backgroundSource={dark ? backgrounds.darkGlasses : backgrounds.glasses}
      layoutSource={layouts.glasses}
      includeBackButton
    />
  )
}

export default Glasses;