import React, { Component } from 'react';
import Folder from './Folder';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      folders: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    this.setState((prevState) => {
      const updatedFolders = prevState.folders.map((folder) => {
        if (folder.id === id) {
          folder.open = !folder.open;
          console.log(`changed ${folder.name} to ${folder.open}`);
          fetch('../../../assets/slides', { headers: { folder: folder.name } })
            .then((res) => res.json())
            .then((res) => console.log(res));
        }
        return folder;
      });
      return {
        folders: updatedFolders,
      };
    });
  }

  componentDidMount() {
    fetch('../../../assets')
      .then((res) => res.json())
      .then((res) => (
        res.reduce((acc, folder) => {
          const storage = {};
          storage.id = res.indexOf(folder);
          storage.name = folder;
          storage.open = false;
          acc.push(storage);
          return acc;
        }, [])
      ))
      .then(
        (result) => {
          this.setState({
            loaded: true,
            folders: result,
          });
        },
      );
  }

  render() {
    const { err, loaded, folders } = this.state;
    if (err) return <div>Error: {err.message}</div>;
    if (!loaded) return <div className="mainContainer">{'Hey, cutie! It\'s loading...'}</div>;

    const folderButtons = folders.map((folder) => (
      <Folder
        folder={folder}
        key={folder.id}
        handleChange={this.handleChange}
      />
    ));

    return (
      <div className="mainContainer">
        <ul>
          {folderButtons}
        </ul>
      </div>
    );
  }
}

export default MainContainer;
