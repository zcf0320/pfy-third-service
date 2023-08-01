/** @format */

import React from 'react';
import Jump from 'page/perfectRecord/component/Jump';
import './index.scss';
import RegionPicker from '@components/RegionPicker';
import { observer, inject } from 'mobx-react';
import { PerfectRecordStore } from '@store/interface';

type IProps = {
  setIndex: (index: number) => void;
  perfectRecordStore?: PerfectRecordStore;
};
@inject('perfectRecordStore')
@observer
class Region extends React.Component<IProps, {}> {
  refs: any = React.createRef();

  render() {
    const { province, city, region } =
      this.props.perfectRecordStore!.healthData;
    return (
      <div className='region'>
        <div className='content'>
          <div className='title'>请选择您所在的地区</div>
          <div className='picker'>
            <RegionPicker
              ref={(refs) => (this.refs = refs)}
              selected={[province || 1, city || 7047, region || 51]}
            />
          </div>
        </div>
        <div className='region-bottom'>
          <Jump
            index={4}
            isClick={true}
            next={() => {
              this.props.perfectRecordStore!.setHealthData({
                province: this.refs.props.value[0],
                city: this.refs.props.value[1],
                region: this.refs.props.value[2],
              });
              this.props.setIndex && this.props.setIndex(5);
            }}
            back={() => {
              this.props.perfectRecordStore!.setHealthData({
                province: this.refs.props.value[0],
                city: this.refs.props.value[1],
                region: this.refs.props.value[2],
              });
              this.props.setIndex && this.props.setIndex(3);
            }}
            skip={() => {
              this.props.setIndex(3);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Region;
