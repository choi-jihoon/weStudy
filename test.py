groups = ['hello', {'hello': 'hi'}, 'yo']

groups.append('sup')

print(groups)

groups.pop(groups.index({'hello': 'hi'}))

print(groups)
