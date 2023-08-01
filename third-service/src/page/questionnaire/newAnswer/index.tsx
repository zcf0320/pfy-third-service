import React, { Component } from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router-dom';
import { getUrlParams, codeMap, getNavBarTitle } from '@utils/filter';
import { observer, inject } from 'mobx-react';
import { QuestionnaireStore, CommonStore } from '@store/interface';
import { toJS } from 'mobx';
import { Modal } from 'antd-mobile';
import Page from '@components/Page';
import QuestionName from './questionName';
import QuestionItem from './questionItem';
const footer = require('@assert/footer.png');
const imgUrl = 'https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/';
interface IState {
  partIndex: number;
  questionIndex: number;
  title: string;
  type: number;
  buttonText: string;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
  commonStore: CommonStore;
}
type PropsType = RouteComponentProps & IProps;
const alert = Modal.alert;
let timer: any;
@inject('questionnaireStore')
@inject('commonStore')
@observer
class Answer extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      partIndex: 0,
      questionIndex: 0,
      title: '',
      type: 1,
      buttonText: '',
    };
  }
  componentDidMount() {
    let code = getUrlParams('code');
    let type = codeMap[code];
    this.setState({
      title: getNavBarTitle(type),
      type,
    });
    document.title = getNavBarTitle(type);
    // 获取答题信息
    this.props.questionnaireStore
      .getQuestionnaire({
        code,
      })
      .then((res: any) => {
        let questionnaire = res.questionnaire;
        // 糖尿病
        if (type === 2) {
          // part1部分
          let partone = questionnaire[0];
          partone.questions.forEach((item: any, index: number) => {
            // 头部没有图片
            if (index === 0 || index === 1 || index === 5) {
              item.answers.forEach((aItem: any, aIndex: number) => {
                aItem.img = `${imgUrl}${type}_0_${index}_${aIndex}.png`;
              });
            } else {
              item.titleImg = `${imgUrl}${type}_0_${index}.png`;
            }
          });
        }
        //心脏病
        if (type === 3) {
          // part1部分
          let partone = questionnaire[0];
          partone.questions.forEach((item: any, index: number) => {
            // 头部没有图片
            item.titleImg = `${imgUrl}${type}_0_${index}.png`;
          });
        }
        //高血压
        if (type === 4) {
          // part1部分
          let partone = questionnaire[0];
          partone.questions.forEach((item: any, index: number) => {
            // 头部没有图片
            item.titleImg = `${imgUrl}${type}_0_${index}.png`;
          });
        }
        //膳食
        if (type === 1) {
          // part1部分
          let partone = questionnaire[0];
          partone.questions.forEach((item: any, index: number) => {
            // 头部没有图片
            item.titleImg = `${imgUrl}${type}_0_${index}.png`;
          });
          //part2部分
          let parttwo = questionnaire[1];
          parttwo.questions.forEach((item: any, index: number) => {
            // 头部没有图片
            item.titleImg = `${imgUrl}${type}_1_${index}.png`;
          });
        }
        this.props.questionnaireStore.setQuestionnaire(questionnaire);
      });
  }
  selectAnswer = (answersIndex: number) => {
    const { questionnaire } = toJS(this.props.questionnaireStore) || {};
    const { questionIndex, partIndex } = this.state;
    // 单选重置
    if (questionnaire[partIndex].questions[questionIndex].answerType === 1) {
      questionnaire[partIndex].questions[questionIndex].answers.forEach(
        (item) => {
          item.select = false;
        }
      );
    }
    questionnaire[partIndex].questions[questionIndex].answers[
      answersIndex
    ].select =
      !questionnaire[partIndex].questions[questionIndex].answers[answersIndex]
        .select;
    this.props.questionnaireStore.setQuestionnaire(questionnaire);
  };
  // 上一个
  pre() {
    let { questionIndex, partIndex } = this.state;
    const { questionnaire } = toJS(this.props.questionnaireStore) || [];
    if (partIndex === 0 || (partIndex !== 0 && questionIndex !== 0)) {
      this.setState({
        questionIndex: questionIndex - 1,
      });
    }
    if (partIndex !== 0 && questionIndex === 0) {
      this.setState({
        partIndex: partIndex - 1,
        questionIndex: questionnaire[partIndex - 1].questions.length - 1,
        buttonText:
          partIndex - 1 < questionnaire.length - 1 ? '第二部分' : '提交',
        title: questionnaire[partIndex - 1].partName,
      });
    }
  }
  // 下一个
  next() {
    if (this.watchNextStatus()) {
      let { questionIndex } = this.state;
      this.setState({
        questionIndex: questionIndex + 1,
      });
    }
  }
  showAlert(params: any) {
    alert('确认要提交吗', '提交成功后将为你生成专业的问卷测评结果', [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
        style: { color: '#999', fontSize: 14 },
      },
      {
        text: '确认',
        onPress: () => {
          this.props.questionnaireStore
            .addQuestionnaire(params)
            .then((res: any) => {
              this.props.history.replace(
                `/questionnaire/newResult?code=${res.pageCode}&score=${res.score}`
              );
            });
        },
        style: { color: '#FE9A51', fontSize: 14 },
      },
    ]);
  }
  // 提交记录
  subInfo() {
    const { partIndex } = this.state;
    const { questionnaire } = toJS(this.props.questionnaireStore) || [];
    if (!this.watchNextStatus()) {
      return;
    }
    if (partIndex === questionnaire.length - 1) {
      let answerReqs: any = [];
      questionnaire.forEach((qItem) => {
        qItem.questions.forEach((item) => {
          let result: any = {
            questionId: item.questionId,
            answerIds: [],
          };
          item.answers.forEach((AItem) => {
            AItem.select && result.answerIds.push(AItem.answerId);
          });
          answerReqs.push(result);
        });
      });

      let code = getUrlParams('code');
      let type = codeMap[code];
      let channelId = getUrlParams('channelId');
      const { mobile, name, age, sex } =
        this.props.questionnaireStore.subInfo || {};
      let params: any = {
        code,
        answerReqs,
        mobile,
        name,
      };
      if (type !== 1 || type !== 2) {
        params.sex = sex;
        params.age = age;
      }
      const { serviceRecordId } = toJS(this.props.commonStore);
      serviceRecordId && (params.serviceRecordId = serviceRecordId);
      channelId && (params.channelCode = channelId);
      this.showAlert(params);
    } else {
      this.setState({
        partIndex: partIndex + 1,
        questionIndex: 0,
        title: questionnaire[partIndex + 1].partName,
      });
    }
  }
  // 监听下一题按钮
  watchNextStatus() {
    const { partIndex } = this.state;
    const { questionnaire } = toJS(this.props.questionnaireStore) || [];
    if (questionnaire.length) {
      // 值判断对后一个
      let last =
        questionnaire[partIndex].questions[
          questionnaire[partIndex].questions.length - 1
        ].answers;
      let lastSelect = last.filter((item) => {
        return item.select;
      });
      return !!lastSelect.length;
    }
  }
  select(partIndex: number, questionIndex: number, answerIndex: number) {
    const { questionnaire } = toJS(this.props.questionnaireStore) || [];
    // if(questionnaire[partIndex].questions[questionIndex].answers[answerIndex].select){
    //     return
    // }

    questionnaire[partIndex].questions[questionIndex].answers.forEach(
      (item) => {
        item.select = false;
      }
    );
    questionnaire[partIndex].questions[questionIndex].answers[
      answerIndex
    ].select = true;
    this.props.questionnaireStore.setQuestionnaire(questionnaire);
    if (questionIndex === questionnaire[partIndex].questions.length - 1) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.setState({
        questionIndex: this.state.questionIndex + 1,
      });
      //判断是否最后一题
      this.setState({
        buttonText: partIndex < questionnaire.length - 1 ? '第二部分' : '提交',
      });
      timer = null;
    }, 500);
  }
  render() {
    const { questionIndex, partIndex, buttonText, title } = this.state;
    const { questionnaire } = toJS(this.props.questionnaireStore) || {};
    return (
      //     <div className={`page answer flex ${toJS(this.props.commonStore).env !== 'weapp' ? '' : 'weapp'}`}>
      //         {toJS(this.props.commonStore).env !== 'weapp' && <NavBar title={title}/>}
      //     <div className="center">
      //         <div className="process flex">
      //             <span>{questionIndex + 1}</span>
      //             <div className="line">
      //                 <div className="active" style={{
      //                     'width': `${questionnaire.length && ((questionIndex + 1)/(questionnaire[partIndex].questions.length)) * 100}%`
      //                 }}></div>
      //             </div>
      //             <span>{questionnaire.length && questionnaire[partIndex].questions.length }</span>
      //         </div>
      //         <div className="content flex">
      //             <div className="title flex">
      //                 <span className='text'>{questionnaire.length && questionnaire[partIndex].questions[questionIndex].questionName}</span>
      //                 {questionnaire.length && questionnaire[partIndex].questions[questionIndex].questionRemark && <span className='text'>{questionnaire.length && questionnaire[partIndex].questions[questionIndex].questionRemark}</span>}
      //             </div>
      //             <div className="main-content flex">
      //                 <div className="answer-list">
      //                     {
      //                         questionnaire.length && questionnaire[partIndex].questions[questionIndex].answers.map((item: any,index: number) => {
      //                             return (
      //                                 <div className={`answer-item flex ${item.select ? 'active' : ''}`} key={item.answerId} onClick={() => {
      //                                     this.selectAnswer(index)
      //                                 }}>
      //                                     {item.answerName}
      //                                 </div>
      //                             )
      //                         })
      //                     }

      //                 </div>
      //             </div>
      //             <div className="bottom flex one">
      //                 {/* 判断是否为最后一个 */}
      //                 {
      //                     questionnaire.length ? (
      //                             <div className='options'>
      //                                 <span className={`text pre ${!questionIndex && !partIndex ? 'disable' : ''}`} onClick={() => {
      //                                 this.pre()
      //                                 }}>上一题</span>
      //                                 {
      //                                     (questionIndex < questionnaire[partIndex].questions.length - 1) ? (<span className={`text next ${this.watchNextStatus() ? 'active' : ''}`} onClick={() => {
      //                                         this.next()
      //                                     }}>下一题</span>) : <span className={`sub ${this.watchNextStatus() ? '' : 'disable'}`} onClick={
      //                                         () => {
      //                                             this.subInfo()
      //                                         }
      //                                     }>{
      //                                         questionnaire.length && ( partIndex === questionnaire.length - 1 ? '提交' : questionnaire[partIndex + 1].partName)
      //                                     }</span>
      //                                 }

      //                             </div>
      //                     ) : null
      //                 }
      //             </div>
      //         </div>
      //     </div>
      // </div>
      <Page title={title}>
        <div className='page-new-answer flex'>
          <div className='page-new-answer-content'>
            <QuestionName
              questionIndex={questionIndex}
              partIndex={partIndex}></QuestionName>
            <QuestionItem
              questionIndex={questionIndex}
              partIndex={partIndex}
              type={this.state.type}
              select={this.select.bind(this)}></QuestionItem>
          </div>
          {((questionIndex !== 0 && questionnaire.length) || partIndex !== 0) &&
            (questionIndex !== questionnaire[partIndex].questions.length - 1 ? (
              <div
                className='sub flex'
                onClick={() => {
                  this.pre();
                }}>
                上一题
              </div>
            ) : (
              <div className='sub-list flex'>
                <div
                  className='sub-item flex'
                  onClick={() => {
                    this.pre();
                  }}>
                  上一题
                </div>
                <div
                  className={`sub-item flex ${
                    this.watchNextStatus.call(this) ? 'active' : 'disable'
                  }`}
                  onClick={() => {
                    this.subInfo();
                  }}>
                  {buttonText}
                </div>
              </div>
            ))}

          <img alt='' src={footer} className='footer' />
        </div>
      </Page>
    );
  }
}
export default Answer;
