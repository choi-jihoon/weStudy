from app.models import db, Note

def seed_notes():
    note1 = Note(
        user_id = 1,
        group_id = 1,
        note_title = 'Python Lists and Tuples',
        note_text =
        """Lists
    - mutable, ordered collections (like arrays in JavaScript)
    - defined using square brackets

Tuples
    - immutable, ordered collections
    - defined using parentheses
    - sorted() will sort a tuple but return a list by default

Lists vs Tuples
    Tuples are: immutable, hashable, more memory efficient than a list
    Lists are: mutable and dynamic"""
    )

    note2 = Note(
        user_id = 2,
        group_id = 3,
        note_title = 'SplitaBill Wiki',
        note_text=
        """Github Link: https://github.com/choi-jihoon/SplittaBill

Live Site: https://split-a-bill.herokuapp.com/

Contributors:
    Jihoon (Fiona) Choi [ https://www.linkedin.com/in/jihoon-choi-a6967a221/ ]

    Cody Lavene [ https://www.linkedin.com/in/codylavene/ ]

    Vivian Thach [ https://www.linkedin.com/in/vivianthach1023/ ]"""
    )

    note3 = Note(
        user_id = 2,
        group_id = 3,
        note_title = 'Workflow',
        note_text =
        """Friends
    - When a friend is added, find User with that email and create 2 records on the Friends table
    - When a friend is deleted, delete both records on the Friends table

Bills
    - When a Bill is created,
        - Grab ids of all users specified by username
        - Create an expense with the total_amount split between each payer_id
        - Update all the Friend balances involved
    - When a Bill is deleted, all related Expenses, Transaction Records, and Comments are also deleted (taken care of by cascade on models)
    - Editing a Bill's total_amount should edit corresponding Expenses
    - Editing a Bill's description has no effect on corresponding Expenses

Transaction records
    - When a user clicks "Settle Up"/"Pay" next to a bill/expense, create a Transaction Record for that expense_id using the Bill's owner_id (as recipient_id)
        - Decrease (update) that Expense's amount_due
            - Check if the amount_due is 0. If it is, change "settled" attribute to True.
        - Update the corresponding balances in Friends"""
    )

    note4 = Note(
        user_id = 2,
        group_id = 2,
        note_title = 'Gotta Latte Do Wiki',
        note_text=
        """Github Link: https://github.com/strewm/Gotta-Latte-Do

Live Site: https://gotta-latte-do.herokuapp.com/

Contributors:
    Jihoon (Fiona) Choi [ https://www.linkedin.com/in/jihoon-choi-a6967a221/ ]

    Thien Dang [ https://www.linkedin.com/in/thien-dang-ct/ ]

    Tanner Shaw [ https://www.linkedin.com/in/tanner-shaw-a25702162/ ]

    Savanah Trewman [ https://www.linkedin.com/in/savanah-trewman/ ]"""
    )

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.commit()

def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
