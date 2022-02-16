groups = ['hello', {'hello': 'hi'}, 'yo']

groups.append('sup')

print(groups)

groups.pop(groups.index({'hello': 'hi'}))

print(groups)


a = {'a': 1, 'b': 2, 'c': 3}

print(dir(dict(a)))
