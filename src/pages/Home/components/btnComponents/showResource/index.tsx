import { Modal, message } from 'antd';
import { useReactive } from 'ahooks';
import ScreenContainer from './screenContainer';
import { findCodeBySourceMap } from '@/utils/monitor/sourcemap';
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2';

export type ModalPropsType = {
  open: boolean;
  html?: string;
};

const ShowResource: React.FC<{
  record: any;
}> = ({ record }) => {
  const modalProps = useReactive<ModalPropsType>({
    open: false,
    html: undefined,
  });

  return (
    <>
      <PunkEffectButton2
        key="playScreen"
        type="primary"
        onClick={async () => {
          message.loading({
            content: '加载中',
            key: 'loadingsource',
            duration: 0,
          });
          try {
            findCodeBySourceMap(record?.apikey || '', record, (res) => {
              modalProps.open = true;
              modalProps.html = res;
              message.destroy('loadingsource');
            });
          } catch (error) {
            message.destroy('loadingsource');
          }
        }}
      >
        查看源码
      </PunkEffectButton2>
      <Modal
        title="查看源码"
        open={modalProps.open}
        destroyOnClose
        width={700}
        onCancel={() => (modalProps.open = false)}
        okButtonProps={{
          style: { display: 'none' },
        }}
      >
        <ScreenContainer modalProps={modalProps} />
      </Modal>
    </>
  );
};

export default ShowResource;
