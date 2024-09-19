from sqlalchemy import create_engine, Column, String, Integer, Text, DateTime, Boolean, ForeignKey, text, inspect
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
import os
import uuid
from dotenv import load_dotenv

# Tải biến môi trường từ file .env
load_dotenv()

# Lấy các biến môi trường
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("PORT")
db_database = os.getenv("DB_DATABASE")

# Tạo URL kết nối
DATABASE_URL = f"mysql+mysqlconnector://{db_user}:{db_password}@{db_host}:{db_port}/{db_database}"

# Kết nối tới cơ sở dữ liệu MySQL
engine = create_engine(DATABASE_URL)

# Tạo lớp cơ sở dữ liệu
Base = declarative_base()

# Định nghĩa các bảng
class SystemAdministratorAccount(Base):
    __tablename__ = 'system_administrator_account'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    status = Column(String(255), nullable=False)
    registration_time = Column(DateTime, nullable=False)

    # Định nghĩa quan hệ một-nhiều với Member
    members = relationship("Member", back_populates="account")

class Member(Base):
    __tablename__ = 'members'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    account_id = Column(String(36), ForeignKey('accounts.id'), nullable=False)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20))
    reputation = Column(Integer, default=0)
    role = Column(String(50), nullable=False)
    biography = Column(Text)
    
    # Quan hệ với Account
    account = relationship("Account", back_populates="members")

class Badge(Base):
    __tablename__ = 'badges'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    description = Column(String(255))

class MemberBadge(Base):
    __tablename__ = 'member_badges'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    badge_id = Column(String(36), ForeignKey('badges.id'), nullable=False)

class Tag(Base):
    __tablename__ = 'tags'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    description = Column(String(255))

class Question(Base):
    __tablename__ = 'questions'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    title = Column(String(255), nullable=False)
    question_text = Column(Text, nullable=False)
    creation_time = Column(DateTime, nullable=False)
    update_time = Column(DateTime)
    status = Column(String(50), nullable=False)
    closing_remark = Column(String(255))

class MemberView(Base):
    __tablename__ = 'member_views'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    question_id = Column(String(36), ForeignKey('questions.id'), nullable=False)
    flagged = Column(Boolean, default=False)
    viewing_time = Column(DateTime, nullable=False)

class QuestionTag(Base):
    __tablename__ = 'question_tags'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question_id = Column(String(36), ForeignKey('questions.id'), nullable=False)
    tag_id = Column(String(36), ForeignKey('tags.id'), nullable=False)

class Answer(Base):
    __tablename__ = 'answers'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question_id = Column(String(36), ForeignKey('questions.id'), nullable=False)
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    answer_text = Column(Text, nullable=False)
    accepted = Column(Boolean, default=False)
    creation_time = Column(DateTime, nullable=False)

class MemberVote(Base):
    __tablename__ = 'member_votes'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    answer_id = Column(String(36), ForeignKey('answers.id'))
    question_id = Column(String(36), ForeignKey('questions.id'))
    related_type = Column(String(50), nullable=False)
    vote_type = Column(String(50), nullable=False)

class AnswerFlag(Base):
    __tablename__ = 'answer_flags'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    answer_id = Column(String(36), ForeignKey('answers.id'), nullable=False)

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    question_id = Column(String(36), ForeignKey('questions.id'), nullable=False)
    comment_text = Column(Text, nullable=False)
    creation_time = Column(DateTime, nullable=False)

class CommentFlag(Base):
    __tablename__ = 'comment_flags'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    comment_id = Column(String(36), ForeignKey('comments.id'), nullable=False)

class Photo(Base):
    __tablename__ = 'photos'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    path = Column(String(255), nullable=False)
    question_id = Column(String(36), ForeignKey('questions.id'))
    answer_id = Column(String(36), ForeignKey('answers.id'))
    related_type = Column(String(50))

class Notification(Base):
    __tablename__ = 'notifications'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    member_id = Column(String(36), ForeignKey('members.id'), nullable=False)
    content = Column(String(255), nullable=False)
    creation_time = Column(DateTime, nullable=False)
    read = Column(Boolean, default=False)

class Bounty(Base):
    __tablename__ = 'bounties'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question_id = Column(String(36), ForeignKey('questions.id'), nullable=False)
    reputation = Column(Integer, nullable=False)
    expiry = Column(DateTime, nullable=False)

class QuestionEdit(Base):
    __tablename__ = 'question_edits'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question_id = Column(String(36), ForeignKey('questions.id'))
    edit_time = Column(DateTime)
    new_text = Column(Text, nullable=False)
    accepted = Column(Boolean, default=False)


# Tạo cơ sở dữ liệu và bảng
def setup_database():
    Base.metadata.create_all(engine)

# Tạo phiên làm việc
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

if __name__ == "__main__":
    setup_database()
