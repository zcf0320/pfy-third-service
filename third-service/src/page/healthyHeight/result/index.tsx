/** @format */

import React, { Component } from 'react';
import NavBar from '@components/NavBar';
import F2 from '@antv/f2';
import { observer, inject } from 'mobx-react';
// import videojs from "video.js";
import 'video.js/dist/video-js.css';
import { ConclusionParams } from '@store/healthyHeight/interface';
import { CommonStore } from '@store/interface';
import { getUrlParams } from '@utils/filter';
import { toJS } from 'mobx';
import './index.scss';
// const bg = require("@assert/result_top_bg.png");
interface IVideoOptions {
  height: number | undefined;
  width: number | undefined;
  autoplay: boolean;
  muted: boolean;
  controls: boolean;
  sources: [
    {
      src: string;
      type: string;
    }
  ];
  playbackRates: number[];
  controlBar: {
    // 竖直的音量控制
    volumePanel: {
      inline: boolean;
    };
  };
}

interface HealthyHeightStore {
  getConclusion: (params: ConclusionParams) => any;
}

interface IProps {
  options: IVideoOptions;
  healthyHeightStore: HealthyHeightStore;
  commonStore: CommonStore;
}

interface IState {
  videoRef?: HTMLElement | HTMLVideoElement | HTMLDivElement | null;
  player?: any;
  data?: any;
  tabIndex: number;
  chartList: any;
  conclusion: any;
}

@observer
@inject('healthyHeightStore')
@inject('commonStore')
class Result extends Component<IProps, IState> {
  public state: IState = {
    tabIndex: 1,
    data: [],
    chartList: [],
    conclusion: {},
  };

  public chart: any = {};

  // 属性默认值
  // public static defaultProps = {
  //     options: {
  //         height: 385,
  //         width: 686,
  //         autoplay: false,
  //         muted: true,
  //         controls: true,
  //         playbackRates: [0.5, 1, 1.5, 2],
  //         sources: [{
  //             src: 'https://user-center-1301127519.cos.ap-shanghai.myqcloud.com/video/shaoerjiangao/chenfengsheng.mp4',
  //             type: 'video/mp4'
  //         }],
  //         controlBar: {
  //             // 竖直的音量控制
  //             volumePanel: {
  //             inline: false
  //             },
  //         }
  //     }
  // };
  componentDidMount() {
    // const { options } = this.props;
    // const player = videojs(this.state.videoRef, options);
    // videojs(this.state.videoRef).ready(function () {
    //   //监听
    //   player.on('play', function () {
    //     console.log('开始播放')
    //   });
    //   player.on('pause', function () {
    //     console.log('播放暂停')
    //   });
    //   player.on('timeupdate', function (e: any) {
    //     var currentTime = Math.floor(player.currentTime());
    //     if (currentTime > 0 && (currentTime % 5 == 0)) {
    //       //每隔5秒，向服务器提交播放时间(秒)
    //     }
    //     console.log(currentTime)
    //   });
    // });
    // console.log(player)
    let env = getUrlParams('env');
    env && this.props.commonStore.setEnv(env);
    document.title = '测试结果';
    // @ts-ignore
    // document.getElementById('container') && document.getElementById('container').setAttribute('width', `${document.getElementById('container-box').offsetWidth}px`);
    this.props.healthyHeightStore
      .getConclusion({
        resultId: getUrlParams('resultId'),
      })
      .then((res: any) => {
        let chartList: any = [];
        let list = res.normals.filter((item: any) => {
          return item.sex === res.sex;
        });
        list.forEach((item: any) => {
          item.detail.forEach((detail: any) => {
            // 垃圾
            let name = '';
            item.score === '3rd' && (name = '发育迟缓');
            item.score === '50th' && (name = '正常水平');
            item.score === '97th' && (name = '发育较好');
            detail.score = item.score;
            detail.name = name;
          });
          chartList = [...chartList, ...item.detail];
        });
        // 这个是自己的点, 妈蛋
        let obj = [
          {
            age: Number(res.age),
            weight: Number(res.weight),
            height: Number(res.height),
            score: 'self',
            name: '您的身高',
          },
        ];
        chartList = [...chartList, ...obj];
        let heightType = 1;
        let weightType = 1;
        res.heightConclusion === '正常' && (heightType = 2);
        res.heightConclusion === '偏高' && (heightType = 3);
        res.weightConclusion === '正常' && (weightType = 2);
        res.weightConclusion === '偏胖' && (weightType = 3);
        console.log(chartList);
        // 封装渲染的值
        this.setState({
          chartList,
          conclusion: {
            heightConclusion: res.heightConclusion,
            weightConclusion: res.weightConclusion,
            headCircumference: res.headCircumference,
            chestCircumference: res.chestCircumference,
            heightType,
            weightType,
          },
        });

        // 创建图表
        this.chart = new F2.Chart({
          id: 'container',
          pixelRatio: window.devicePixelRatio,
          width: document.getElementById('container-box')?.offsetWidth,
          height: 340,
        });
        // 设置数据
        this.chart.source(chartList);
        // 设置坐标
        this.chart.axis('age', {
          line: null,
          label: function label(text: any, index: number, total: number) {
            console.log(text);

            const textCfg = {
              textAlign: '',
            };
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          },
        });
        this.chart.legend({
          position: 'top',
          // offsetY: 5,
          align: 'left',
        });
        this.chart
          .line()
          .shape('smooth')
          .position('age*height')
          .color('name', ['#FE9A51', '#B3CF3E', '#FF775D', '#4A6AFD']);
        this.chart
          .point()
          .position('age*height')
          .color('name')
          .size('name', (value: string) => {
            if (value === '您的身高') {
              return 3;
            }
            return 0;
          })
          .color('name', ['#FE9A51', '#B3CF3E', '#FF775D', '#4A6AFD']);
        this.chart.render();
      });
    // 监听页面变化重新加载
    // window.addEventListener('resize', () => {
    //     window.location.reload();
    // })
  }

  tabClick = (tabIndex: number) => {
    const { chartList } = this.state;
    chartList.forEach((item: any) => {
      if (tabIndex === 1) {
        item.score === '3rd' && (item.name = '发育迟缓');
        item.score === '50th' && (item.name = '正常水平');
        item.score === '97th' && (item.name = '发育较好');
        item.score === 'self' && (item.name = '您的身高');
      }
      if (tabIndex === 2) {
        item.score === '3rd' && (item.name = '体重过低');
        item.score === '50th' && (item.name = '平均值');
        item.score === '97th' && (item.name = '体重过高');
        item.score === 'self' && (item.name = '您的体重');
      }
    });
    this.setState(
      {
        chartList,
      },
      () => {
        this.chart.clear(); // 清理所有
        if (tabIndex === 1) {
          // 身高
          this.chart
            .line()
            .shape('smooth')
            .position('age*height')
            .color('name', ['#FE9A51', '#B3CF3E', '#FF7875', '#4A6AFD']);
          this.chart
            .point()
            .position('age*height')
            .color('name')
            .size('name', (value: string) => {
              if (value === '您的身高') {
                return 3;
              }
              return 0;
            })
            .color('name', ['#FE9A51', '#B3CF3E', '#FF775D', '#4A6AFD']);
          this.setState({
            tabIndex,
          });
        } else {
          // 体重
          this.chart
            .line()
            .shape('smooth')
            .position('age*weight')
            .color('name', ['#FE9A51', '#B3CF3E', '#FF7875', '#4A6AFD']);
          this.chart
            .point()
            .position('age*weight')
            .color('name')
            .size('name', (value: string) => {
              if (value === '您的体重') {
                return 3;
              }
              return 0;
            })
            .color('name', ['#FE9A51', '#B3CF3E', '#FF775D', '#4A6AFD']);
          this.setState({
            tabIndex,
          });
        }
        this.chart.render();
      }
    );
  };

  render() {
    const { tabIndex, conclusion } = this.state;
    return (
      <div
        className={`page no-padding flex result ${
          toJS(this.props.commonStore).env !== 'weapp' ? '' : 'weapp'
        }`}>
        {toJS(this.props.commonStore).env !== 'weapp' && (
          <NavBar title='测试结果' />
        )}
        {/* <div className="page flex result">
                <NavBar title='测试结果'/> */}
        <div className='center'>
          <div className='top'>
            {/* <img src={bg} alt="" className="bg" />
                        <div className="content">
                        <div className="item flex">
                            <span className="label">TEST</span>
                            <span className="text-spacing">测试结果</span>
                        </div>
                        <div className="item flex">
                            <span className="label">REPORT</span>
                            <span>您的孩子{tabIndex === 1 ? '身高' : '体重'}：{tabIndex === 1 ? conclusion['heightConclusion'] : conclusion['weightConclusion']}</span>
                        </div>
                        </div> */}
            <div className='top-bg'></div>
            <div className='test-report'></div>
            <div className='test-report-text'>测试报告</div>
            <div className='result-item'>
              <div className='result-item-title flex'>测试结果</div>
              <div className='weight flex'>
                <span>您的孩子{tabIndex === 1 ? '身高' : '体重'}：</span>
                <div
                  className={`tag flex tag-${
                    tabIndex === 1
                      ? conclusion['heightType']
                      : conclusion['weightType']
                  }`}>
                  {tabIndex === 1
                    ? conclusion['heightConclusion']
                    : conclusion['weightConclusion']}
                </div>
              </div>
              <div className='weight m-t-24'>
                <span className='head'>
                  头围：{conclusion['headCircumference']}cm
                </span>
                <span>胸围：{conclusion['chestCircumference']}cm</span>
              </div>
            </div>
            <div className='result-item m-t-32'>
              <div className='result-item-title flex'>医师建议</div>
              {tabIndex === 1 ? (
                <div>
                  {conclusion['heightConclusion'] === '偏矮' ? (
                    <div>
                      <div className='result-text'>
                        注意！您需要关注孩子的身高问题
                      </div>
                      <div className='result-text'>
                        请及时带孩子到身高门诊进行检查，寻找宝宝长得慢的原因，并给予针对性治疗。
                      </div>
                      <div className='result-text'>
                        建议孩子增加蛋白质的摄入、增加钙和微量元素的补充、保障孩子充足的睡眠、切勿过度运动。
                      </div>
                    </div>
                  ) : null}
                  {conclusion['heightConclusion'] === '正常' ? (
                    <div>
                      <div className='result-text'>
                        恭喜！您孩子的身高处于正常范围
                      </div>
                      <div className='result-text'>
                        请您持续关注孩子的身高，学习科学管理身高的专业知识，帮助孩子在饮食、睡眠、运动和身体健康上养成好习惯。
                      </div>
                    </div>
                  ) : null}
                  {conclusion['heightConclusion'] === '偏高' ? (
                    <div>
                      <div className='result-text'>您孩子的身高高于同龄人</div>
                      <div className='result-text'>
                        身高与遗传因素有关，如父母双方的身高较高，孩子的身高可能偏高；如父母双方的身高处于正常范围或是低于正常范围，孩子的身高偏高，建议到身高门诊进一步测试骨龄，排除非正常长高的风险。
                        建议孩子平时均衡饮食、坚持钙和微量营养元素的摄入、保障孩子充足的睡眠、规律运动。
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>
                  {conclusion['weightConclusion'] === '偏瘦' ? (
                    <div>
                      <div className='result-text'>注意！孩子的体重过轻</div>
                      <div className='result-text'>
                        对于目前正处于快速发育期的孩子来说，要保持营养均衡，不要挑食；日常学习生活中要注意劳逸结合，加强体育锻炼。
                      </div>
                    </div>
                  ) : null}
                  {conclusion['weightConclusion'] === '正常' ? (
                    <div>
                      <div className='result-text'>
                        恭喜！孩子的体重处于正常范围
                      </div>
                      <div className='result-text'>
                        请您持续关注孩子的体重，帮助孩子在饮食、睡眠、运动和身体健康上养成好习惯。
                      </div>
                    </div>
                  ) : null}
                  {conclusion['weightConclusion'] === '偏胖' ? (
                    <div>
                      <div className='result-text'>注意！孩子的体重过重</div>
                      <div className='result-text'>
                        孩子肥胖会带来很多健康困扰，对于发育期的孩子来说更是如此。
                      </div>
                      <div className='result-text'>
                        建议您合理搭配孩子的饮食、适度的进行运动；必要时请寻求儿科医生的帮助
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <div className='line'>
            <div className='line-title flex'>
              <div className='dot'></div>
              生长曲线图
            </div>
            <div className='tab'>
              <div
                className={`tab-item ${tabIndex === 1 && 'active'}`}
                onClick={() => {
                  this.tabClick(1);
                }}>
                身高
              </div>
              <div
                className={`tab-item ${tabIndex === 2 && 'active'}`}
                onClick={() => {
                  this.tabClick(2);
                }}>
                体重
              </div>
            </div>
            <div id='container-box' className='container-box'>
              <canvas id='container' width='340' height='340'></canvas>
              {/* <div className="point" style={pointPosition}></div> */}
            </div>
          </div>
          <div className='line video'>
            <div className='line-title flex'>
              <div className='dot'></div>
              专家解答
            </div>
            <div className='video-list'>
              <div className='video-item'>
                <div data-vjs-player>
                  <video
                    className='video video-js vjs-big-play-centered' //控制栏样式 必需
                    controls>
                    <source src='http://user-center-1301127519.cos.ap-shanghai.myqcloud.com/video/shaoerjiangao/chenfengsheng.mp4' />
                  </video>
                </div>
                <div className='bottom flex'>
                  <span>父母不高的孩子也能有理想身高吗？</span>
                  <span className='text'>
                    陈凤生（上海瑞金医院主任医师）为您解答
                  </span>
                </div>
              </div>
              <div className='video-item'>
                <div data-vjs-player>
                  <video
                    className='video video-js vjs-big-play-centered' //控制栏样式 必需
                    controls>
                    <source src='http://user-center-1301127519.cos.ap-shanghai.myqcloud.com/video/shaoerjiangao/chenzhaowen.mp4' />
                  </video>
                </div>
                <div className='bottom flex'>
                  <span>早发育的孩子如何达到理想的身高？</span>
                  <span className='text'>
                    陈兆文（复旦大学附属儿科医院内分泌主任）为您解答
                  </span>
                </div>
              </div>
              <div className='video-item'>
                <div data-vjs-player>
                  <video
                    className='video video-js vjs-big-play-centered' //控制栏样式 必需
                    controls>
                    <source src='http://user-center-1301127519.cos.ap-shanghai.myqcloud.com/video/shaoerjiangao/ludajiang.mp4' />
                  </video>
                </div>
                <div className='bottom flex'>
                  <span>每天动一动，孩子可以长高吗？</span>
                  <span className='text'>
                    陆大江（上海体育学院运动科学学院教授）为您解答
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Result;
