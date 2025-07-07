import React from 'react';
import { useUserContext } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div className="container-fluid p-2">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">User Profile</h2>
            </div>

            <div className="card-body">
              {/* Profile Picture */}
              <div className="text-center mb-3">
                <div className="win98-panel-inset d-inline-block p-2" style={{ backgroundColor: '#ffffff' }}>
                  <div style={{ width: '64px', height: '64px', border: '2px inset #c0c0c0', backgroundColor: '#ffffff' }}>
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt="Profile" 
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '../images/no-image.svg';
                        }}
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center win98-panel-inset" style={{ fontSize: '24px' }}>
                        <span>👤</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="mb-2">
                <div className="row mb-2">
                  <div className="col-12">
                    <div className="win98-panel-inset p-2 d-flex align-items-center" style={{ backgroundColor: '#ffffff' }}>
                      <label className="me-2 mb-0" style={{ width: '60px', flexShrink: 0 }}>Name:</label>
                      <span className="flex-grow-1">{user.name || 'Not set'}</span>
                    </div>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-12">
                    <div className="win98-panel-inset p-2 d-flex align-items-center" style={{ backgroundColor: '#ffffff' }}>
                      <label className="me-2 mb-0" style={{ width: '60px', flexShrink: 0 }}>Email:</label>
                      <span className="flex-grow-1">{user.email || 'Not set'}</span>
                    </div>
                  </div>
                </div>

                {/* Task Statistics */}
                <div className="row">
                  <div className="col-12">
                    <div className="win98-panel-inset p-2 d-flex align-items-center" style={{ backgroundColor: '#ffffff' }}>
                      <label className="me-2 mb-0" style={{ width: '60px', flexShrink: 0 }}>Tasks:</label>
                      <span className="flex-grow-1">
                        {user.tasks.tasks.length} task{user.tasks.tasks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
