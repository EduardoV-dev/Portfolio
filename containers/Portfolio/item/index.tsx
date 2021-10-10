import React, { useContext } from 'react';
import { IProject } from '../../../models/interfaces';
import { Sass } from '../../../components/icons';
import { Card, TechBadge } from '../../../components/ui';
import Carousel from '../Carousel';
import styles from './item.module.scss';
import cn from 'classnames';
import { manageUIStyle } from '../../../helpers';
import { appContext } from '../../../hooks/context/AppContext';

const images = [
  'https://images.pexels.com/photos/4887163/pexels-photo-4887163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/7688358/pexels-photo-7688358.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1633872422612-067dfafaa480?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
]

interface IItem {
  project?: IProject;
}

const Item: React.FC<IItem> = ({
  project,
}): JSX.Element => {
  const { state: { darkMode } } = useContext(appContext);

  const sectionNameClassName = cn(styles.item__sectionName, {
    [styles[`item__sectionName-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });
  const projectDescriptionClassName = cn(styles.item__projectDescription, {
    [styles[`item__projectDescription-${manageUIStyle(darkMode)}`]]: manageUIStyle(darkMode),
  });

  return (
    <Card order="pair" className={styles.item}>
      <Carousel
        imagesURL={images}
        className={styles.item__carousel}
      />
      <h4 className={sectionNameClassName}>Project Name</h4>
      <p className={projectDescriptionClassName}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sollicitudin et praesent erat lorem rhoncus velit. Elit pellentesque lobortis neque.
      </p>
      <h4 className={sectionNameClassName}>Technologies</h4>
      <div>
        <TechBadge TechIcon={Sass} />
      </div>
    </Card>
  );
}

export default Item;