webpackJsonp([0],{

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(100);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(101);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

    _this.clickedBtn = function () {
      console.log('swag');
    };

    _this.state = {
      name: 'Joe'
    };
    return _this;
  }

  _createClass(Layout, [{
    key: 'render',
    value: function render() {
      // return (<div className='home'>
      //     <div className='Aligner'>
      //       <div className='Aligner-item'>
      //         <img src='/img/logo.png' />
      //         <h1>Starter-Kit-2k18</h1>
      //         <div className='menu'>
      //           <ul>
      //             <div onClick={this.clickedBtn}>clickked this</div>
      //             <li><a href='http://starterkit.codingphase.com' target='new'>Documentation</a></li>
      //             <li><a href='http://www.codingphase.com' target='new'>CodingPhase.Com</a></li>
      //           </ul>
      //         </div>
      //         <div className='version-num'>
      //           version 2.0.18
      //         </div>
      //         <br />
      //         <a className='github-button' href='https://github.com/codingphasedotcom/Starter-Kit-2018' data-icon='octicon-star' data-style='mega' data-count-href='/codingphasedotcom/rocky/stargazers' data-count-api='/repos/codingphasedotcom/rocky#stargazers_count' data-count-aria-label='# stargazers on GitHub' aria-label='Star codingphasedotcom/rocky on GitHub'>Star</a>
      //       </div>
      //     </div>
      //   </div>)
    }
  }]);

  return Layout;
}(_react.Component);

var ordersForm = document.getElementById('ordersForm');

_reactDom2.default.render(_react2.default.createElement(Layout, null), ordersForm);

/***/ })

},[233]);