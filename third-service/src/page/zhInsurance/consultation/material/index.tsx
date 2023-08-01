import React, { useState } from 'react';
import './index.scss';
import UploadImg from '@components/UploadImg';
import PreviewImage from '@components/PreviewImage';
interface IProps {
  materialList: any;
  deleteImg: Function;
  addItem: Function;
}

function Material(props: IProps) {
  const { deleteImg, addItem, materialList } = props;
  const [url, setUrl] = useState('');
  return (
    <div className="claims-material">
      <div className="claims-material-title">
        <div className="claims-material-redline"></div>
        <div>补充材料</div>
      </div>
      {materialList && materialList.length
        ? materialList.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="claims-material-top">
                  <div className="claims-material-name">
                    <div className="claims-material-materialName">
                      {item.nickname}
                    </div>
                    {item.required ? (
                      <div className="claims-material-red">（必填）</div>
                    ) : (
                      <div className="claims-material-999">（选填）</div>
                    )}
                  </div>
                  <div
                    className="claims-material-example"
                    onClick={() => {
                      setUrl(item.sampleImage || '');
                    }}
                  >
                    {`${item.sampleImage ? '查看示例' : '暂无示例'}`}
                  </div>
                </div>
                <div className="claims-material-intro">
                  {item.materialExplain}
                </div>
                <UploadImg
                  files={item.files}
                  deleteImg={deleteImg}
                  addItem={addItem}
                  index={index}
                />
                {url ? (
                  <PreviewImage
                    imgList={[url]}
                    close={() => {
                      setUrl('');
                    }}
                  ></PreviewImage>
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
}
export default Material;
