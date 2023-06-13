
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import TeamEntity from './src/entities/team_entity';


export default function App() {
  const [teams, setTeams] = useState<TeamEntity[]>([]);

  useEffect (() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer live_73f3f7004efbc54fb475fdd18e5258")

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    let teamsPosition: TeamEntity[] = [];

    fetch("https://api.api-futebol.com.br/v1/campeonatos/10/tabela", requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))
    .then(dataJson => {
      dataJson.map((team) => {
        const dataTeam = {
          id: team['time']['time_id'], 
          position: team['posicao'], 
          team_shield_url: team['time']['escudo'], 
          team_name: team['time']['nome_popular'],
          team_points: team['pontos']
        };

        teamsPosition.push(dataTeam);
      });
      setTeams(teamsPosition);
        console.log(teamsPosition);
    })
    .catch(error => console.log('error', error));
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela Brasileirão série A</Text>
      <View style={styles.table}>
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(team) =>
            <View style={styles.item}>
              <Image style={styles.team_shield} source={{ uri: team.item.team_shield_url }} />
              <Text style={styles.team_position}>{team.item.position}</Text>
              <Text style={styles.team_name}>{team.item.team_name}</Text>
              <Text>{team.item.team_points}</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginBottom: 16,
    marginHorizontal: 16
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 16
  },
  table: {
    flex: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingTop: 16
  },
  team_shield: {
    width: 20,
    height: 20
  },
  team_name:{
    width: 150,
    textAlign: 'center'
  },
  team_position:{
    width: 20
  }
});