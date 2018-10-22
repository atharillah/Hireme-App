import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView, SectionList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../lib/api';

class FieldList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toggle: this.props.item.checked,
    };
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
    this.props.handler(this.props.item.parentCount, this.props.item.count);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.fieldItem}
        onPress={() => this.toggle()}
      >
        <View style={styles.selectionView}>
          {this.state.toggle ?
            <Icon name="checkbox-marked-circle" style={styles.checkedIcon} /> :
            <Icon name="checkbox-blank-circle-outline" style={styles.uncheckedIcon} />
          }
          <Text style={styles.selectionName}>{this.props.item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      education: [
        { key: 'sd', name: 'SD', checked: false },
        { key: 'smp', name: 'SMP', checked: false },
        { key: 'sma', name: 'SMA', checked: false },
        { key: 'd3', name: 'Diploma III', checked: false },
        { key: 's1', name: 'Sarjana / S1', checked: false },
        { key: 's2', name: 'Magister / S2', checked: false },
        { key: 's3', name: 'Doktor / S3', checked: false },
      ],
      fields: [],
    };

    this.setField = this.setField.bind(this);
  }

  componentWillMount() {
    const name = {
      sd: 'SD',
      smp: 'SMP',
      sma: 'SMA',
      d3: 'Diploma III',
      s1: 'Sarjana / S1',
      s2: 'Magister / S2',
      s3: 'Doktor / S3',
    };

    this.props.navigation.getFilter()
      .then((res) => {
        if (res.data) {
          const data = res.data;

          const eduFilter = Object.keys(data.filter.education).map(x => (
            { key: x, name: name[x], checked: data.filter.education[x] }
          ));

          this.setState({ education: eduFilter });
        }
      })
      .catch(err => console.tron.error(err));
  }

  componentDidMount() {
    this.getField();
  }

  setEducation(search) {
    const education = this.state.education.slice();
    for (let i = 0; i < education.length; i += 1) {
      if (education[i].key === search) {
        education[i].checked = !education[i].checked;
        break;
      }
    }

    this.setState({ education });
  }

  async getField() {
    this.props.navigation.getFields()
    .then((res) => {
      if (res.data) {
        this.setState({ fields: res.data });
      }
    })
    .catch(e => console.tron.error(e));
  }

  selectionCard(item) {
    return (
      <TouchableWithoutFeedback onPress={() => this.setEducation(item.key)}>
        <View style={styles.selectionView}>
          {item.checked ?
            <Icon name="checkbox-marked-circle" style={styles.checkedIcon} /> :
            <Icon name="checkbox-blank-circle-outline" style={styles.uncheckedIcon} />
          }
          <Text style={styles.selectionName}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  setField(i, k) {
    const fields = this.state.fields.slice();
    fields.update = true;
    if (fields[i].data[k].checked === undefined) {
      fields[i].data[k].checked = true;
    } else {
      fields[i].data[k].checked = !fields[i].data[k].checked;
    }
    this.setState({ fields });
  }

  render() {
    return (
      <View style={styles.view}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Job Search Filter</Text>
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTextBig}>Choose a job filter</Text>
            <Text style={styles.sectionHeaderTextSmall}>Find jobs that suits you</Text>
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Education</Text>
          </View>
          <FlatList
            data={this.state.education}
            renderItem={({ item }) => this.selectionCard(item)}
          />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Job Field</Text>
          </View>
          {this.state.fields.length > 0 &&
            <SectionList
              sections={this.state.fields}
              renderItem={({ item }) =>
                (<FieldList item={item} handler={this.setField} />)
              }
              renderSectionHeader={({ section }) =>
                (<View style={styles.fieldHeader}>
                  <Text style={styles.fieldHeaderText}>{section.name}</Text>
                </View>)
              }
            />}
        </ScrollView>
        <TouchableOpacity style={styles.saveButton} onPress={() => this.props.navigation.setFilter(this.state)}>
          <View>
            <Text style={styles.saveText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#005C97DD',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    color: 'white',
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    color: '#fefefe',
    marginBottom: 10,
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
  sectionHeader: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionHeaderTextBig: {
    fontSize: 24,
    color: '#333',
  },
  sectionHeaderTextSmall: {
    fontSize: 16,
    color: '#333',
  },
  sectionHeaderText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  checkedIcon: {
    color: '#005C97',
    fontSize: 20,
    marginRight: 15,
  },
  uncheckedIcon: {
    color: '#999',
    fontSize: 20,
    marginRight: 15,
  },
  selectionName: {
    fontSize: 16,
  },
  selectionView: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fieldHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fieldHeaderText: {
    fontWeight: 'bold',
  },
});

export default Filter;
