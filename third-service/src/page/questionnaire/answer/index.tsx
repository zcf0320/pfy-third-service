import React, { Component } from 'react';
import './index.scss';
import NavBar from '@components/NavBar';
import { RouteComponentProps } from 'react-router-dom';
import { getUrlParams, codeMap, getNavBarTitle } from '@utils/filter';
import { observer, inject } from 'mobx-react';
import { QuestionnaireStore, CommonStore } from '@store/interface';
import { toJS } from 'mobx';
import { subInfo } from '@store/questionnaire/interface';
import { Modal } from 'antd-mobile';
interface IState {
  partIndex: number;
  questionIndex: number;
  title: string;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
  commonStore: CommonStore;
}
type PropsType = RouteComponentProps & IProps;
const alert = Modal.alert;
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
    };
  }
  componentDidMount() {
    let code = getUrlParams('code');
    let type = codeMap[code];
    this.setState({
      title: getNavBarTitle(type),
    });
    document.title = getNavBarTitle(type);
    // 获取答题信息
    this.props.questionnaireStore
      .getQuestionnaire({
        code,
      })
      .then((res: any) => {
        this.props.questionnaireStore.setQuestionnaire(res.questionnaire);
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
    // 第一题第一部分不可点击
    if (!questionIndex && !partIndex) {
      return;
    }
    // 第二部分 第一题 返回上一个部分
    if (partIndex && !questionIndex) {
      // 获取上一个部分的最后一题
      let last = questionnaire[partIndex - 1].questions.length - 1;
      this.setState({
        partIndex: partIndex - 1,
        questionIndex: last,
      });
      return;
    }
    this.setState({
      questionIndex: questionIndex - 1,
    });
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
    alert('确认要提交吗', '(选择“提交”将使用掉本权益)', [
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
                `/questionnaire/result?code=${res.pageCode}&score=${res.score}`
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
    // 提交
    // 判断最后一个是否选择
    let lastQuestion =
      questionnaire[partIndex].questions[
        questionnaire[partIndex].questions.length - 1
      ];
    let ansersList = lastQuestion.answers.filter((item) => {
      return item.select;
    });
    if (!ansersList.length) {
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
      const { mobile, name, age, sex } =
        this.props.questionnaireStore.subInfo || {};
      let params: subInfo = {
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
      this.showAlert(params);
    } else {
      this.setState({
        partIndex: partIndex + 1,
        questionIndex: 0,
      });
    }
  }
  // 监听下一题按钮
  watchNextStatus() {
    const { questionIndex, partIndex } = this.state;
    const { questionnaire } = toJS(this.props.questionnaireStore) || [];
    if (questionnaire.length) {
      const activeList = questionnaire[partIndex].questions[
        questionIndex
      ].answers.filter((item) => {
        return item.select === true;
      });
      return !!activeList.length;
    }
  }
  render() {
    const { questionIndex, partIndex, title } = this.state;
    const { questionnaire } = toJS(this.props.questionnaireStore) || {};
    return (
      <div
        className={`page answer flex ${
          toJS(this.props.commonStore).env !== 'weapp' ? '' : 'weapp'
        }`}>
        {toJS(this.props.commonStore).env !== 'weapp' && (
          <NavBar title={title} />
        )}
        <div className='center'>
          <div className='process flex'>
            <span>{questionIndex + 1}</span>
            <div className='line'>
              <div
                className='active'
                style={{
                  width: `${
                    questionnaire.length &&
                    ((questionIndex + 1) /
                      questionnaire[partIndex].questions.length) *
                      100
                  }%`,
                }}></div>
            </div>
            <span>
              {questionnaire.length &&
                questionnaire[partIndex].questions.length}
            </span>
          </div>
          <div className='content flex'>
            <div className='title flex'>
              <span className='text'>
                {questionnaire.length &&
                  questionnaire[partIndex].questions[questionIndex]
                    .questionName}
              </span>
              {questionnaire.length &&
                questionnaire[partIndex].questions[questionIndex]
                  .questionRemark && (
                  <span className='text'>
                    {questionnaire.length &&
                      questionnaire[partIndex].questions[questionIndex]
                        .questionRemark}
                  </span>
                )}
            </div>
            <div className='main-content flex'>
              <div className='answer-list'>
                {questionnaire.length &&
                  questionnaire[partIndex].questions[questionIndex].answers.map(
                    (item: any, index: number) => {
                      return (
                        <div
                          className={`answer-item flex ${
                            item.select ? 'active' : ''
                          }`}
                          key={item.answerId}
                          onClick={() => {
                            this.selectAnswer(index);
                          }}>
                          {item.answerName}
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
            <div className='bottom flex one'>
              {/* 判断是否为最后一个 */}
              {questionnaire.length ? (
                <div className='options'>
                  <span
                    className={`text pre ${
                      !questionIndex && !partIndex ? 'disable' : ''
                    }`}
                    onClick={() => {
                      this.pre();
                    }}>
                    上一题
                  </span>
                  {questionIndex <
                  questionnaire[partIndex].questions.length - 1 ? (
                    <span
                      className={`text next ${
                        this.watchNextStatus() ? 'active' : ''
                      }`}
                      onClick={() => {
                        this.next();
                      }}>
                      下一题
                    </span>
                  ) : (
                    <span
                      className={`sub ${
                        this.watchNextStatus() ? '' : 'disable'
                      }`}
                      onClick={() => {
                        this.subInfo();
                      }}>
                      {questionnaire.length &&
                        (partIndex === questionnaire.length - 1
                          ? '提交'
                          : questionnaire[partIndex + 1].partName)}
                    </span>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Answer;
