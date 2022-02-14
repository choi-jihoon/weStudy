"""empty message

Revision ID: 180e4cbd02c3
Revises: d46163669e8a
Create Date: 2022-02-13 19:18:16.362780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '180e4cbd02c3'
down_revision = 'd46163669e8a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('groups', sa.Column('owner_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'groups', 'users', ['owner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'groups', type_='foreignkey')
    op.drop_column('groups', 'owner_id')
    # ### end Alembic commands ###
