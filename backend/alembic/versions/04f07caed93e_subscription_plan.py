"""subscription_plan

Revision ID: 04f07caed93e
Revises: 751c73002f88
Create Date: 2024-08-21 18:03:25.086511

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '04f07caed93e'
down_revision: Union[str, None] = '751c73002f88'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_users_subscription_type', table_name='users')
    op.create_index(op.f('ix_users_subscription_type'), 'users', ['subscription_type'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_subscription_type'), table_name='users')
    op.create_index('ix_users_subscription_type', 'users', ['subscription_type'], unique=True)
    # ### end Alembic commands ###
