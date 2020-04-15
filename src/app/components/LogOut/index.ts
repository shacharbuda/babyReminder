import { connect } from 'react-redux';
import Component from './component';
import { signOut } from '../../../config/fbConfig';

const mapDispatchToProps = () => ({
  onClick: signOut
});

export default connect(null, mapDispatchToProps)(Component)