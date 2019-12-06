import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {

  render() {
    const { searchText, onChangeSearchField } = this.props;

    return <input type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={ onChangeSearchField }
      value={ searchText }/>;
  }
}
