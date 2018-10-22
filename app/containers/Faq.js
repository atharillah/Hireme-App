import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../resources/default-profile.png';

export default class Faq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: true,
    };
  }

  render() {
    return (
      <View style={styles.view}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>FAQ</Text>
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          <Text style={styles.question}>Bagaimana cara menggunakan aplikasi HireMe!? Akses apa yang diberikan?</Text>
          <Text style={styles.answer}>Aplikasi HireMe! Membagi pengguna kepada 2 bagian. Untuk anda yang memiliki hasrat mencari pekerjaan atau job-seekers maka anda dapat memilih bagian I’m Looking, dimana anda dapat melihat informasi seputar lowongan pekerjaan yang ada. Sedangkan untuk anda yang memiliki usaha,bagian dari  institusi resmi, dan hingga penyedia layanan jasa anda dapat memilih bagian I’m Hiring, dimana anda akan dapat memberikan informasi seputar proses rekrutmen.</Text>
          <Text style={styles.question}>Dimana saja saya bisa mengunduh aplikasi HireMe!?</Text>
          <Text style={styles.answer}>Hingga saat ini aplikasi HireMe! Dapat diunduh melalui Play Store (Android). Namun seiring perkembangan, kami akan memperluas cakupan dan jaringan kami agar dapat dinikmati pengguna IoS dan segera meluncurkan website resmi.</Text>
          <Text style={styles.question}>Siapakah yang menjadi target utama pengembangan aplikasi ini?</Text>
          <Text style={styles.answer}>Target kami ialah mengembangkan aplikasi ini di lingkungan tenaga kerja yang membutuhkan lapangan pekerjaan. Sudah menjadi komitmen kami untuk turut andil menurunkan presentase pengangguran di Indonesia.</Text>
          <Text style={styles.question}>Apakah setiap lowongan pekerjaan di HireMe! Bebas dari hoax?</Text>
          <Text style={styles.answer}>Ya, akan dilakukan proses verifikasi secara teliti yang melibatkan identitas (KTP), email institusi / wirausahawan, dan alamat. Apabila anda menemui lowongan yang bersifat hoax, segera menekan tombol report dan berikan alasan anda sehingga akan diproses secara cepat oleh tim kami.</Text>
          <Text style={styles.question}>Apakah ada pihak yang mengetahui setiap penelusuran yang dilakukan pada HireMe!?</Text>
          <Text style={styles.answer}>Tidak, HireMe! Mengutamakan privasi setiap pengguna aplikasi.</Text>
          <Text style={styles.question}>Apa yang terjadi apabila lowongan pekerjaan di HireMe! Telah habis masa open recruitment nya?</Text>
          <Text style={styles.answer}>Lowongan pekerjaan akan hilang sendiri dengan sendirinya karena telah berstatus kadaluarsa.</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    paddingHorizontal: 30,
  },
  question: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
    marginBottom: 5,
  },
  option: {
    flexDirection: 'row',
  },
  optionDesc: {
    justifyContent: 'center',
  },
  optionInfo: {
    fontSize: 12,
    color: '#666',
  },
  switch: {
    alignSelf: 'flex-end',
    flex: 1,
  },
  header: {
    fontSize: 18,
    color: '#fefefe',
    marginBottom: 10,
  },
  name: {
    color: '#fefefe',
    marginTop: 10,
    fontSize: 22,
  },
  ttl: {
    color: '#ddd',
  },
  profilePictureView: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 96,
    height: 96,
  },
  profilePicture: {
    width: 96,
    height: 96,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    color: '#005C97',
    marginTop: 15,
  },
  data: {
    color: '#222',
    fontSize: 16,
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
  edit: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  editIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
});
