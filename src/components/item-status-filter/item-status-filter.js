import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
  buttons = [
    { name: 'all', text: 'All' },
    { name: 'active', text: 'Active' },
    { name: 'done', text: 'Done' },
  ];

  render() {
    const { filterMode, onChangeFilterMode } = this.props;

    const buttons = this.buttons.map(({ name, text }) => {
      const secondCls = filterMode === name ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button
          key={name}
          type="button"
          onClick={ () => onChangeFilterMode(name) }
          className={ `btn ${secondCls}` }>
            { text }
        </button>
      );
    });

    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  }
}
