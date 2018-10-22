import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-animatable';
import TouchableView from '../../components/TouchableView';

const Box = ({ children, looking, delay, duration, ...props }) => (
  <TouchableView {...props} style={[styles.block, (looking ? styles.looking : {})]} animation={'zoomIn'} delay={delay} duration={duration}>
    {children}
  </TouchableView>
);

export default class MainSelector extends Component {
  async hideForm() {
    await Promise.all([
      this.formRef.fadeOut(200),
    ]);
  }

  render() {
    const { setVisibleForm } = this.props;
    return (
      <View style={styles.main} ref={ref => (this.formRef = ref)}>
        <View animation={'zoomIn'} delay={200} duration={400}>
          <Text style={styles.header}>HireMe</Text>
          <Text style={styles.subHeader}>Find Your Imagination Job</Text>
        </View>
        <Box
          looking
          delay={700}
          duration={400}
          onPress={() => setVisibleForm('LOGIN')}
        >
          <Text style={styles.blockText}>I{"'"}m Looking</Text>
          <Text style={styles.blockSubText}>Saya ingin mencari pekerjaan di sekitar saya</Text>
        </Box>
        <Box
          delay={1000}
          duration={400}
          onPress={() => setVisibleForm('REGISTER_HIRING')}
        >
          <Text style={styles.blockText}>I{"'"}m Hiring</Text>
          <Text style={styles.blockSubText}>Saya ingin membuat lowongan kerja</Text>
        </Box>
      </View>
    );
  }
}

MainSelector.propTypes = {
  setVisibleForm: PropTypes.func.isRequired,
};

Box.propTypes = {
  children: PropTypes.any.isRequired,
  looking: PropTypes.bool,
  delay: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

Box.defaultProps = {
  looking: false,
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fefefe',
  },
  subHeader: {
    marginTop: -10,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fefefe',
  },
  block: {
    alignSelf: 'stretch',
    margin: 10,
    borderColor: '#ffffff33',
    backgroundColor: '#ffffff11',
    borderWidth: 1,
    marginTop: 0,
    justifyContent: 'center',
    flex: 1,
  },
  looking: {
    flex: 2,
  },
  blockText: {
    color: '#fefefe',
    alignSelf: 'center',
    fontSize: 30,
  },
  blockSubText: {
    color: '#ccc',
    alignSelf: 'center',
  },
});
