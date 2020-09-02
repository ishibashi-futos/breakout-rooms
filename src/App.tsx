import React from 'react';
import {Grid, Button, TextField, Container, TableContainer, Checkbox} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import './App.css';

interface IProps {

}

interface IState {
  name: string
  users: {name: string, room: string, disabled: boolean}[]
  roomCount: number
}

type User = {name: string, room: string, disabled: boolean}

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: "",
      users: [
        {name: "大黒 昭吉", room: "-", disabled: false},
        {name: "江川 澄子", room: "-", disabled: false},
        {name: "及川 新吉", room: "-", disabled: false},
        {name: "古谷 俊章", room: "-", disabled: false},
        {name: "寺岡 咲来", room: "-", disabled: false},
        {name: "鬼頭 惟史", room: "-", disabled: false},
        {name: "太田 真凛", room: "-", disabled: false},
        {name: "田岡 藤雄", room: "-", disabled: false},
        {name: "折原 秀一", room: "-", disabled: false},
        {name: "唐沢 莉子", room: "-", disabled: false},
      ],
      roomCount: 0,
    }
    this.addUser = this.addUser.bind(this)
    this.onChangeTextField = this.onChangeTextField.bind(this)
    this.onCheckBoxChanged = this.onCheckBoxChanged.bind(this)
    this.assign = this.assign.bind(this)
  }

  addUser(): void {
    const {name, users} = this.state;
    if (name === "") return
    const saved = this.state.users.filter(user => user.name === name).length > 0
    if (saved) {
      const message = `${name} は既に追加されたユーザです`;
      console.log(message)
      alert(message)
      return
    }
    users.push({name: name, room: "-", disabled: false})
    this.setState({
      name: "",
      users: users,
    })
  }

  onChangeTextField(e: React.ChangeEvent<HTMLInputElement>): void {
    const name = e.target.value;
    console.log(`input name=${name}`)
    this.setState({
      name: name
    })
  }

  onCheckBoxChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name
    const users = this.state.users.map((user) => {
      if (user.name === name) {
        user.disabled = e.target.checked
      }
      return user
    })
    this.setState({users})
  }

  deleteUsers(name: string): void {
    const users = this.state.users.filter((user) => user.name !== name)
    this.setState({users})
  }

  assign(): void {
    const {users, roomCount} = this.state;
    const filterd = users.filter(user => !user.disabled)
    const disabledUsers = users.filter(user => user.disabled)
    if (roomCount > filterd.length) {
      alert("ユーザ数より少ない数を指定してください");
      return
    }
    const userPerRooms = Math.floor(filterd.length / roomCount)
    const shuffle = (arr: User[]) => {
      let m = arr.length
      while(m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }
    let roomId = 1
    const newUsers = shuffle(filterd).map((user, i) => {
      if (roomId < userPerRooms && i !== 0 && ((i % roomCount) === 0)) {
        roomId++;
      }
      user.room = `room${roomId}`
      return user;
    })
    this.setState({users: [...newUsers, ...disabledUsers]});
  }

  rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    return (
      <div className="App">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <TextField id="standard-basic" label="ユーザ名" onChange={this.onChangeTextField} value={this.state.name} size="medium"></TextField>
          <Button color="primary" onClick={this.addUser} startIcon={<AddIcon />} >Add</Button>
        </Grid>
        <Container maxWidth="sm">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Disabled</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.users.map((row) => {
                    return (
                      <TableRow key={row.name}>
                        <TableCell>
                          <Checkbox checked={row.disabled} color="primary" name={row.name} onChange={this.onCheckBoxChanged}></Checkbox>
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.room}</TableCell>
                        <TableCell>
                          <Button color="secondary" onClick={() => {this.deleteUsers(row.name)}} startIcon={<DeleteIcon />}>x</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Container>
          <div>
            参加者を<TextField type="number" onChange={(e) => {
              const roomCount = parseInt(e.target.value)
              if (isNaN(roomCount)) return
              this.setState({roomCount})
            }}></TextField>人ずつのルームに割り当てる
          </div>
          <div>
            <Button color="primary" onClick={this.assign}>Assign</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
