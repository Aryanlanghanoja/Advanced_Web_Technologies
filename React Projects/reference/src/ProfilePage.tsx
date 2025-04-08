import type React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import type { User } from "./types/User"
import { FaEnvelope, FaPhone, FaCalendar, FaShieldAlt, FaBuilding, FaBriefcase } from "react-icons/fa"
import styles from "./ProfilePage.module.css"

interface ProfilePageProps {
  user: User
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "admin":
        return <FaShieldAlt className={styles.typeIcon} />
      case "employee":
        return <FaBuilding className={styles.typeIcon} />
      case "marketingAgency":
        return <FaBriefcase className={styles.typeIcon} />
      default:
        return null
    }
  }

  return (
    <Container className={`my-5 ${styles.profileContainer}`}>
      <Card className={styles.profileCard}>
        <div className={styles.headerSection}>
          <div className={styles.profileImageWrapper}>
            <img
              src={user.profileImage || "/Admin.jpg?height=150&width=150"}
              alt={user.name}
              className={styles.profileImage}
            />
          </div>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userType}>
            {getIcon(user.type)}
            {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
          </p>
        </div>
        <Card.Body>
          <Row className={styles.infoRow}>
            <Col sm={8} className={styles.infoCol}>
              <div className={styles.infoItem}>
                <FaEnvelope className={styles.icon}/>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <p className={styles.infoValue}>{user.email}</p>
                </div>
              </div>
            </Col>
            <Col sm={6} className={styles.infoCol}>
              <div className={styles.infoItem}>
                <FaPhone className={styles.icon} />
                <div>
                  <p className={styles.infoLabel}>Phone</p>
                  <p className={styles.infoValue}>{user.phone}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={styles.infoRow}>
            <Col sm={8} className={styles.infoCol}>
              <div className={styles.infoItem}>
                <FaCalendar className={styles.icon} />
                <div>
                  <p className={styles.infoLabel}>Join Date</p>
                  <p className={styles.infoValue}>{new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </Col>
            <Col sm={6} className={styles.infoCol}>
              {user.type === "admin" && (
                <div className={styles.infoItem}>
                  <FaShieldAlt className={styles.icon} />
                  <div>
                    <p className={styles.infoLabel}>Access Level</p>
                    <p className={styles.infoValue}>{user.accessLevel}</p>
                  </div>
                </div>
              )}
              {user.type === "employee" && (
                <div className={styles.infoItem}>
                  <FaBuilding className={styles.icon} />
                  <div>
                    <p className={styles.infoLabel}>Department</p>
                    <p className={styles.infoValue}>{user.department}</p>
                  </div>
                </div>
              )}
              {user.type === "marketingAgency" && (
                <div className={styles.infoItem}>
                  <FaBriefcase className={styles.icon} />
                  <div>
                    <p className={styles.infoLabel}>Agency Name</p>
                    <p className={styles.infoValue}>{user.agencyName}</p>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProfilePage

