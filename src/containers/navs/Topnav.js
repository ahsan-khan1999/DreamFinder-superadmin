/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable */

import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Button,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import test from '../../assets/img/image.png';
import IntlMessages from 'helpers/IntlMessages';
import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
  buyUrl,
  adminRoot,
} from 'constants/defaultValues';
import { MobileMenuIcon, MenuIcon } from 'components/svg';
import { getDirection, setDirection } from 'helpers/Utils';
import logo from '../../assets/logos/logo.png';

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from 'redux/actions';

import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';
import ModalChangePassword from './ChangeModel';
import { logout } from 'Utils/auth.util';
import { logOutUser } from 'Store/Actions/Auth/Actions';
import { NotificationManager } from 'components/common/react-notifications';
const TopNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const handleChangeLocale = (_locale, direction) => {
    changeLocaleAction(_locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  const dispatch = useDispatch();

  const logoutUser = () => {
    let res = dispatch(logOutUser());
    if (res) {
      logout();
      // console.log(res);
      history.push('/user/login');
    }else{
    }
  };
  let [show, setShow] = useState(false);
  let [hide, setHide] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        search();
        elem.classList.remove('mobile-view');
        removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const addEventsSearch = () => {
    document.addEventListener('click', handleDocumentClickSearch, true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    logoutUserAction(history);
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const { messages } = intl;
  return (
    <>
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={(e) =>
              menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>

          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
          <span className="d-block d-xs-none">
            <img
              className="logo_dmfr"
              src={logo}
              alt=""
              height="55px"
              width="200px"
              // style={{ 'margin-left': '10px' }}
            />
          </span>
          <span className="d-none d-xs-block">
            <img
              className="logo_dmfr"
              src={logo}
              alt=""
              height="55px"
              width="220px"
              // style={{ margin: '0px 40px' }}
            />
          </span>
          {/* <NavLink className="navbar-logo" to={adminRoot}>
            <span className="d-none d-xs-block">
              <img
                className=""
                src={logo}
                alt=""
                height="55px"
                width="220px"
                // style={{ margin: '0px 40px' }}
              />
            </span>
            <span className="d-block d-xs-none">
              <img
                className=""
                src={logo}
                alt=""
                height="55px"
                width="220px"
                style={{ left: '0px' }}
              />
            </span>
          </NavLink> */}

          {/* <div className="search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages['menu.search']}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div> */}

          {/* <div className="position-relative d-none d-none d-lg-inline-block">
          <a
            className="btn btn-outline-primary btn-sm ml-2"
            target="_top"
            href={buyUrl}
          >
            <IntlMessages id="user.buy" />
          </a>
        </div> */}
        </div>
        {/* <NavLink className="navbar-logo" to={adminRoot}>
          <span className="d-none d-xs-block">
            <img
              className=""
              src={logo}
              alt=""
              height="55px"
              width="220px"
              // style={{ margin: '0px 40px' }}
            />
          </span>
          <span className="d-block d-xs-none">
            <img
              className=""
              src={logo}
              alt=""
              height="55px"
              width="220px"
              style={{ left: '0px' }}
            />
          </span>
        </NavLink> */}
        <div className="navbar-right">
          {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}

          <div className="user ">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="">
                <span>
                  <img src={test}></img>
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3">
                {/* <DropdownItem onClick={showModal}>Change Password</DropdownItem> */}

                <DropdownItem color="" onClick={showModal}>
                  Change Password
                </DropdownItem>

                <DropdownItem onClick={logoutUser}>Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
      <ModalChangePassword show={show} handleClose={hideModal} history={history}/>
    </>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
