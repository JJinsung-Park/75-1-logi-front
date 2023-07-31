import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import insureList from '../../reducer/InsureReducer';
import SocialInsure from './SocialInsure';

const SocialInsureContainer = () => {
    return <SocialInsure />;
};

// const mapStateToProps = state => ({
//     insureList: state.hr.salary.insureList
// });

// export default connect(mapStateToProps, {
//     insureListRequest
// })(SocialInsureContainer);

export default SocialInsureContainer;
