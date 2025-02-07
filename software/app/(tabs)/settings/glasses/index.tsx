import SettingPage from '@/components/tabs/settings/SettingPage';

import backgrounds from '@/constants/backgrounds';
import layouts from '@/constants/layouts';

const Glasses = () => {
  return (
    <SettingPage
      title="Glasses"
      backgroundSource={backgrounds.glasses}
      layoutSource={layouts.glasses}
      includeBackButton
    />
  )
}

export default Glasses;