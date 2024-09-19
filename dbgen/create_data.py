import os
import uuid
import random
from datetime import datetime, timedelta
from faker import Faker
from sqlalchemy.orm import sessionmaker
from models import (
    Base, SystemAdministratorAccount, Account, Member, Badge, MemberBadge, Tag,
    Question, MemberView, QuestionTag, Answer, MemberVote, AnswerFlag, Comment,
    CommentFlag, Photo, Notification, Bounty, QuestionEdit, engine, DATABASE_URL
)

# Tạo phiên làm việc
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
fake = Faker()

def generate_phone_number():
    return '0' + ''.join([str(random.randint(0, 9)) for _ in range(9)])

def create_system_administrator_account(session):
    admin = SystemAdministratorAccount(
        username='admin',
        password='123456qwerty'
    )
    session.add(admin)
    session.commit()

def create_accounts(session, num_records=10):
    for _ in range(num_records):
        account = Account(
            username=fake.user_name(),
            password=fake.password(),
            status='Active',
            registration_time=fake.date_time_this_month()
        )
        session.add(account)
    session.commit()

def create_members(session):
    accounts = session.query(Account).all()
    for account in accounts:
        member = Member(
            account_id=account.id,
            name=fake.name(),
            email=fake.email(),
            phone=generate_phone_number(),
            reputation=random.randint(0, 100),
            role=fake.word(),
            biography=""
        )
        session.add(member)
    session.commit()

def create_badges(session, num_records=10):
    for _ in range(num_records):
        badge = Badge(
            name=fake.word(),
            description=fake.sentence()
        )
        session.add(badge)
    session.commit()

def create_member_badges(session, num_records=10):
    members = session.query(Member).all()
    badges = session.query(Badge).all()
    for _ in range(num_records):
        member_badge = MemberBadge(
            member_id=random.choice(members).id,
            badge_id=random.choice(badges).id
        )
        session.add(member_badge)
    session.commit()

def create_tags(session, num_records=10):
    for _ in range(num_records):
        tag = Tag(
            name=fake.word(),
            description=fake.sentence()
        )
        session.add(tag)
    session.commit()

def create_questions(session, num_records=10):
    members = session.query(Member).all()
    for _ in range(num_records):
        question = Question(
            member_id=random.choice(members).id,
            title=fake.sentence(),
            question_text=fake.text(),
            creation_time=fake.date_time_this_month(),
            update_time=None,
            status='Open',
            closing_remark=None
        )
        session.add(question)
    session.commit()

def create_member_views(session, num_records=10):
    members = session.query(Member).all()
    questions = session.query(Question).all()
    for _ in range(num_records):
        member_view = MemberView(
            member_id=random.choice(members).id,
            question_id=random.choice(questions).id,
            flagged=random.choice([True, False]),
            viewing_time=fake.date_time_this_month()
        )
        session.add(member_view)
    session.commit()

def create_question_tags(session, num_records=10):
    questions = session.query(Question).all()
    tags = session.query(Tag).all()
    for _ in range(num_records):
        question_tag = QuestionTag(
            question_id=random.choice(questions).id,
            tag_id=random.choice(tags).id
        )
        session.add(question_tag)
    session.commit()

def create_answers(session, num_records=10):
    questions = session.query(Question).all()
    members = session.query(Member).all()
    for _ in range(num_records):
        answer = Answer(
            question_id=random.choice(questions).id,
            member_id=random.choice(members).id,
            answer_text=fake.text(),
            accepted=False,
            creation_time=fake.date_time_this_month()
        )
        session.add(answer)
    session.commit()

def create_member_votes(session, num_records=10):
    members = session.query(Member).all()
    answers = session.query(Answer).all()
    questions = session.query(Question).all()
    for _ in range(num_records):
        member_vote = MemberVote(
            member_id=random.choice(members).id,
            answer_id=random.choice(answers).id,
            question_id=random.choice(questions).id,
            related_type=random.choice(['answer', 'question']),
            vote_type=fake.word()
        )
        session.add(member_vote)
    session.commit()

def create_answer_flags(session, num_records=10):
    members = session.query(Member).all()
    answers = session.query(Answer).all()
    for _ in range(num_records):
        answer_flag = AnswerFlag(
            member_id=random.choice(members).id,
            answer_id=random.choice(answers).id
        )
        session.add(answer_flag)
    session.commit()

def create_comments(session, num_records=10):
    members = session.query(Member).all()
    questions = session.query(Question).all()
    for _ in range(num_records):
        comment = Comment(
            member_id=random.choice(members).id,
            question_id=random.choice(questions).id,
            comment_text=fake.text(),
            creation_time=fake.date_time_this_month()
        )
        session.add(comment)
    session.commit()

def create_comment_flags(session, num_records=10):
    members = session.query(Member).all()
    comments = session.query(Comment).all()
    for _ in range(num_records):
        comment_flag = CommentFlag(
            member_id=random.choice(members).id,
            comment_id=random.choice(comments).id
        )
        session.add(comment_flag)
    session.commit()

def create_photos(session, num_records=10):
    questions = session.query(Question).all()
    answers = session.query(Answer).all()
    for _ in range(num_records):
        photo = Photo(
            path=fake.file_path(),
            question_id=random.choice(questions).id if random.choice([True, False]) else None,
            answer_id=random.choice(answers).id if random.choice([True, False]) else None,
            related_type=fake.word()
        )
        session.add(photo)
    session.commit()

def create_notifications(session, num_records=10):
    members = session.query(Member).all()
    for _ in range(num_records):
        notification = Notification(
            member_id=random.choice(members).id,
            content=fake.sentence(),
            creation_time=fake.date_time_this_month(),
            read='False',
        )
        session.add(notification)
    session.commit()

def create_bounties(session, num_records=10):
    questions = session.query(Question).all()
    for _ in range(num_records):
        bounty = Bounty(
            question_id=random.choice(questions).id,
            reputation=random.randint(1, 100),
            expiry=fake.date_time_this_month()
        )
        session.add(bounty)
    session.commit()

def create_question_edits(session, num_records=10):
    questions = session.query(Question).all()
    for _ in range(num_records):
        question_edit = QuestionEdit(
            question_id=random.choice(questions).id,
            edit_time=fake.date_time_this_month(),
            new_text=fake.text()
        )
        session.add(question_edit)
    session.commit()

def main():
    # Tạo phiên làm việc
    session = SessionLocal()

    # Tạo dữ liệu cho các bảng
    create_system_administrator_account(session)
    create_accounts(session)
    create_members(session)
    create_badges(session)
    create_member_badges(session)
    create_tags(session)
    create_questions(session)
    create_member_views(session)
    create_question_tags(session)
    create_answers(session)
    create_comments(session)

    # Đóng phiên làm việc
    session.close()

if __name__ == "__main__":
    main()
