import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Container } from '../../../components';
import { IProject } from '../../../models/interfaces';
import { db } from '../../../services/firebase';
import Item from '../item';
import styles from './central.module.scss';

const Central: React.FC<{}> = (): JSX.Element => {
  const [projects, setProjects] = useState<DocumentData>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'projects'), (snapshot) => {
        const projectsFetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsFetchedData);
      }),
    []
  );

  return (
    <Container containerType="container" className={styles.container}>
      {projects.length &&
        projects.map((project: IProject) => (
          <Item key={project.id} project={project} />
        ))}
    </Container>
  );
};

export default Central;
