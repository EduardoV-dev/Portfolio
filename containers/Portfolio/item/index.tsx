import React, { useContext } from 'react';
import { IProject } from '../../../models/interfaces';
import { ChevronRight, CodeOpen } from '../../../icons';
import { Button, Card } from '../../../components';
import { manageUIStyle } from '../../../helpers';
import { appContext } from '../../../hooks/context/AppContext';
import Carousel from '../Carousel';
import styles from './item.module.scss';
import cn from 'classnames';
import BadgesList from '../BadgesList';

interface IItem {
  project: IProject;
  className?: string;
}

const Item: React.FC<IItem> = ({ project, className }): JSX.Element => {
  const {
    state: { darkMode },
  } = useContext(appContext);
  const {
    name,
    description,
    images,
    technologies,
    urlToProduction,
    urlToSourceCode,
  } = project;

  const itemClassNames = cn(styles.item, className);
  const sectionNameClassName = cn(styles.item__sectionName, {
    [styles[`item__sectionName-${manageUIStyle(darkMode)}`]]:
      manageUIStyle(darkMode),
  });
  const projectDescriptionClassName = cn(styles.item__projectDescription, {
    [styles[`item__projectDescription-${manageUIStyle(darkMode)}`]]:
      manageUIStyle(darkMode),
  });

  return (
    <Card order="pair" className={itemClassNames}>
      <Carousel imagesURL={images} className={styles.item__carousel} />
      <h4 className={sectionNameClassName}>{name}</h4>
      <p className={projectDescriptionClassName}>{description}</p>
      <h4 className={sectionNameClassName}>Technologies</h4>
      <BadgesList
        className={styles.item__badgesContainer}
        technologies={technologies}
      />
      <div className={styles.item__btnsContainer}>
        <Button
          type="link"
          href={urlToProduction}
          color="primary"
          text="Visit site"
          icon={ChevronRight}
          className={styles.item__btn}
        />
        <Button
          type="link"
          href={urlToSourceCode}
          color="secondary"
          text="Source code"
          icon={CodeOpen}
        />
      </div>
    </Card>
  );
};

export default Item;
