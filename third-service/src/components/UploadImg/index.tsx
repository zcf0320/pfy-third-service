import React from 'react';
import { ImagePicker } from 'antd-mobile';
import { upload } from '@api/common';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
interface IProps {
  files: any;
  deleteImg: Function;
  addItem: Function;
  index?: number;
}
function UploadImg(props: IProps) {
  const { files } = props;
  const commonStore = useStores('commonStore');

  //修改图片
  const onImageChange = async (files: any, type: string, index?: number) => {
    if (type === 'add') {
      let url = await upload(files[files.length - 1].file);
      props.addItem({ data: url, index: props.index });
    }
    if (type === 'remove') {
      commonStore.setModal({
        show: true,
        content: '确认要删除吗？',
        clickConfirm: () => {
          props.deleteImg(props.index, index);
        },
      });
    }
  };
  return (
    <div className="upload-image flex">
      <ImagePicker files={files} onChange={onImageChange}></ImagePicker>
    </div>
  );
}
export default observer(UploadImg);
