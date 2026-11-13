import sys
sys.path.insert(0, '.')
from slides import *
prs = new_deck()
only = [int(a) for a in sys.argv[2:]]
for i, f in enumerate(ALL, 1):
    if not only or i in only:
        f(prs)
prs.save(sys.argv[1])
print('ok', len(prs.slides))
