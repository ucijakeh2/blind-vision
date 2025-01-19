import SettingPage from '@/components/tabs/settings/SettingPage';

import backgrounds from '@/constants/backgrounds';
import layouts from '@/constants/layouts';

const Stick = () => {
  return (
    <SettingPage 
      title='Stick'
      backgroundSource={backgrounds.stick}
      layoutSource={layouts.stick}
      includeBackButton
    />
  )
}

export default Stick;