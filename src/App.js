import React, { Component } from 'react';
import './App.css';

import Guide from './components/Guide'
import TitlePreview from './components/TitlePreview'

import Downloader from './Downloader'
import template from './template.png'

class App extends Component {
  constructor() {
    super()
    this.state = {
      title: 'miobiki\nogp generator',
      fontSize: 120,
      visibleGuide: true,
    }
    this.svg = React.createRef()
    this.bgImage = new Image()
    this.bgImage.src = template
  }

  _download() {
    if (!window.confirm('ダウンロードしますか?')) return

    const { svg, bgImage } = this
    Downloader.svg(svg.current, 2000, 755, bgImage)
  }

  render() {
    const { title, fontSize, visibleGuide } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1>miobiki ogp generator</h1>
        </header>
        <main>
          <div className="preview">
            <Guide show={visibleGuide} />
            <svg viewBox="0 0 2000 775" width="2000" height="775"
              ref={this.svg}
            >
              <image
                xlinkHref={template}
                x="0" y="0"
                width="2000" height="775" />
              <TitlePreview
                title={title}
                fontSize={fontSize}
              />
            </svg>
          </div>
          <table>
            <tbody>
              <tr>
                <td colSpan="2"><label className="pointer"><span className="bold userselect-none">guide:</span> <input type="checkbox" defaultChecked={visibleGuide} onChange={(e) => {this.setState({ visibleGuide: !visibleGuide })}}/></label></td>
              </tr>
              <tr>
                <th>title: </th>
                <td><textarea defaultValue={title} onChange={(e) => {this.setState({ title: e.target.value })}}></textarea></td>
              </tr>
              <tr>
                <th>font-size: </th>
                <td><input type="number" value={fontSize} onChange={(e) => {this.setState({ fontSize: Number(e.target.value) })}} /></td>
              </tr>
              <tr>
                <td colSpan="2"><button onClick={this._download.bind(this)}>download</button></td>
              </tr>
              </tbody>
            </table>
        </main>
      </div>
    );
  }
}

export default App;
