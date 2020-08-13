import React, { Component } from 'react';
import { join, resolve } from 'path';
import Folder from './Folder';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      folders: [], // each folder in folders is an array of pdf objects with name and url keys
    };
    this.handleChange = this.handleChange.bind(this);
    this.path = '../../../assets';
  }

  handleChange(id) {
    const updatedFolders = this.state.folders.map((folder) => {
      if (folder.id === id) {
        folder.open = !folder.open;
        if (!folder.open) folder.slides = [];
        else {
          fetch(join(this.path, '/slides'), { headers: { folder: folder.name } })
            .then((res) => res.json())
            .then((res) => folder.slides.push(...res))
            .then(() => this.forceUpdate());
        }
      } else {
        folder.open = false;
        folder.slides = [];
      }
      return folder;
    });
    this.setState({ folders: updatedFolders });
  }

  componentDidMount() {
    fetch(this.path)
      .then((res) => res.json())
      .then((res) => (
        res.reduce((acc, folder) => {
          const storage = {};
          storage.id = res.indexOf(folder);
          storage.name = folder;
          storage.open = false;
          storage.slides = [];
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
    if (!loaded) return <div className="mainContainer"><h1>{'Loading, please stand by...'}</h1></div>;

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
