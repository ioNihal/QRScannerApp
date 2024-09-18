import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

const About = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>QR Scanner Application</Text>
      <Text style={styles.description}>
        This application helps maintain QR scanning for tickets, making the process faster and easier. It saves time and is easy to access.
      </Text>
      <Text style={styles.credit}>Made by students from the BCA Department at Srinivas University.</Text>
      <Text style={styles.teamHeading}>Team Members:</Text>
      {teamMembers.map((member, index) => (
        <TouchableOpacity key={index} onPress={() => openLink(member.github)}>
          <View style={styles.teamMemberContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.teamMember}>{member.name}</Text>
            <Text style={styles.teamMember}> - </Text>
            <Text style={styles.roles}>{member.roles}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={{borderWidth: 1, borderColor: 'lightgrey', width: '100%', marginVertical: 25}} />
      <Text style={styles.footer}>© su scanner 2024</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'justified',
  },
  credit: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    textAlign: 'justified',
  },
  teamHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
  teamMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  bullet: {
    fontSize: 16,
    color: '#777',
    marginRight: 10,
  },
  teamMember: {
    fontSize: 16,
    color: '#555',
    lineHeight: 20,
    textAlign: 'left',
  },
  roles : {
    fontSize: 16,
    color: '#543',
    opacity: 0.7,
  },
  footer: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  }
});

// Replace with actual GitHub profile URLs
const teamMembers = [
  { name: 'Mohammed Rabeeu Ullat', github: 'https://github.com/MohammedRabeeu', roles: 'Frontend'},
  { name: 'Shahabas Abdul Hameed', github: 'https://github.com/S488U' , roles: 'Frontend'},
  { name: 'Athul R V', github: 'https://github.com/47hxl-53r' , roles: 'Backend'},
  { name: 'Nihal K', github: 'https://github.com/ioNihal' , roles: 'Frontend'},
  { name: 'Akshath', github: 'https://github.com/AKSHATH99' , roles: 'Frontend'},
  { name: 'Owais', github: 'https://github.com/Ubbix1' , roles: 'Backend'},
  { name: 'Alan', github: 'https://github.com/Alan' , roles: 'Backend'},
];

export default About;