import React, { PureComponent } from 'react';

/**
 * Used to add css classes during the enter
 * and exit stages of the children.
 *
 * The Gateway has the following props:
 *
 * enterClass - {string} - a class name from the stylesheets
 * exitClass - {string} - a class name from the stylesheets
 * These classes will be added to the children.
 *
 * NB: When children are components/functional components they
 * must use className prop in order to get these classes.
 *
 * exitDuration - {number} - in milliseconds. Should
 * match or be less than the sum of the animation duration and
 * animation delay defined in the css file in the
 * corresponding exitClass. If this duration is greater, then
 * the wrapped content will stay rendered for a moment equal
 * to the difference.
 *
 * @class Ciao
 */
export class Ciao extends PureComponent {
  state = {
    children: null,
    isExit: false
  };

  __isMounted = false;

  timeout = null;

  renderChildren = (isExit, children) => {
    if (this.props.wrap) {
      return <div className={isExit ? this.props.exitClass || null : this.props.enterClass || null}>{children}</div>;
    } else {
      return React.Children.map(children, (child, i) => {
        const classes = [child.props.className];
        if (isExit) {
          if (this.props.exitClass) {
            classes.push(this.props.exitClass);
          }
        } else {
          if (this.props.enterClass) {
            classes.push(this.props.enterClass);
          }
        }

        return React.cloneElement(child, {
          className: classes.join(' ')
        });
      });
    }
  };

  // *************************************************
  // ************** Lifecycle Methods ****************
  // *************************************************
  static getDerivedStateFromProps({ children: nextChildren }, prevState) {
    let stateUpdate = null;

    // If the next children are existing...
    if (nextChildren !== null) {
      // ... assume that the they are entering:
      stateUpdate = { isExit: false, children: nextChildren };

      // But if there have been previous children
      // of different type, first exit them:
      if (prevState.children !== null && nextChildren.type !== prevState.children.type) {
        stateUpdate = { isExit: true };
      }

      // If the next children are null, but
      // there are old children, then ...
    } else if (prevState.children !== null) {
      // ... it's time to exit the old ones:
      stateUpdate = { isExit: true };
    } else {
      // No children. No exit:
      stateUpdate = { isExit: false };
    }

    return stateUpdate;
  }

  render() {
    return this.renderChildren(this.state.isExit, this.state.children);
  }

  componentDidMount() {
    this.__isMounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const childrenAreRemoved = this.props.children === null && this.state.children !== null;
    const childrenTypeChanged =
      this.props.children !== null &&
      prevProps.children !== null &&
      prevProps.children.type !== this.props.children.type;

    if (childrenAreRemoved) {
      this.timeout = setTimeout(() => {
        // Let the children stay for exitDuration milliseconds
        // and be animated by the exitClass, then remove them:
        this.__isMounted && this.setState({ children: null });
      }, this.props.exitDuration);
    } else if (childrenTypeChanged) {
      this.timeout = setTimeout(() => {
        // If new type of children is coming, let the old one
        // be animated by the exitClass for the exitDuration
        // milliseconds and then set the new ones:
        this.__isMounted && this.setState({ children: this.props.children });
      }, this.props.exitDuration);
    } else {
      clearTimeout(this.timeout);
    }
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }
}

export default Ciao;
