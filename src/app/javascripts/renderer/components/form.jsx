const React = require('react');
const T = require('../services/twitter');
const {dialog} = require('electron').remote;

module.exports = class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSendButtonClick() {
    dialog.showMessageBox({
      type: 'question',
      title: '確認',
      message: 'ツイートしてもよろしいですか？',
      buttons: ['はい', 'いいえ'],
      defaultId: 0,
      cancelId: 1
    }, (index) => {
      if (index === 1) {
        return;
      }

      let params = {status: this.state.text.trim()};

      T.post('statuses/update', params)
        .catch(error => {
          console.log(error);
        })
        .then(result => {
          this.setState({text: ''});
        });
    });
  }

  render() {
    return(
      <div className='window'>
        <div className='window-content'>
          <div>
            <textarea style={{width: 300, height: 250}}
                      value={this.state.text}
                      onChange={this.handleTextChange.bind(this)} />
          </div>
        </div>
        <footer className='toolbar toolbar-footer'>
          <div className='toolbar-actions'>
            <button className='btn btn-primary pull-right' onClick={this.handleSendButtonClick.bind(this)}>
              ツイート
            </button>
          </div>
        </footer>
      </div>
    );
  }
};
