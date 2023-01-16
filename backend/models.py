from extensions import db


class ShoppingList(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    items = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<List object {self.title} >"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title: str, items: str):
        self.title = title
        self.items = items
        db.session.commit()


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username} >"

    def save(self):
        db.session.add(self)
        db.session.commit()
