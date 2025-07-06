import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <h2>User Profile</h2>
        </div>

        <div className={styles.profileContent}>
          {/* Profile Picture */}
          <div className={styles.profilePictureSection}>
            <div className={styles.profilePicture}>
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt="Profile" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '../images/no-image.svg';
                  }}
                />
              ) : (
                <div className={styles.profilePlaceholder}>
                  <span>👤</span>
                </div>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className={styles.profileInfo}>
            <div className={styles.infoField}>
              <label>Name:</label>
              <span className={styles.infoValue}>{user.name || 'Not set'}</span>
            </div>

            <div className={styles.infoField}>
              <label>Email:</label>
              <span className={styles.infoValue}>{user.email || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
