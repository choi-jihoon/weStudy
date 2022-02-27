"""empty message

Revision ID: 1639df6d75f2
Revises: 3cd57bad6016
Create Date: 2022-02-26 09:36:14.391222

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1639df6d75f2'
down_revision = '3cd57bad6016'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('users_room_id_fkey', 'users', type_='foreignkey')
    op.drop_column('users', 'room_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('room_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('users_room_id_fkey', 'users', 'rooms', ['room_id'], ['id'])
    # ### end Alembic commands ###