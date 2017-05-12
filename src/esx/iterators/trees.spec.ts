describe('Tree Iterators', () => {

  interface Node<T> {
    value: string;
    children?: Node<T>[];
  }
  type Tree<T> = Node<T>;

  const tree: Node<string> = {
    value: 'A',
    children: [{
      value: 'B',
      children: [{
        value: 'E'
      }, {
        value: 'F'
      }, {
        value: 'G'
      }]
    }, {
      value: 'C',
      children: [{
        value: 'M',
        children: [{
          value: 'R'
        }]
      }, {
        value: 'N',
        children: [{
          value: 'S'
        }]
      }]
    }, {
      value: 'D',
      children: []
    }]
  }

  describe('with functions', () => {

    it('performs depth-first traversal', () => {
      function traverseDepth<T>(tree: Tree<T>, op: Function): void {
        op(tree.value);
        if (tree.children){
          tree.children.forEach(child => traverseDepth(child, op))
        }
      }

      let tmp1 = '';
      const op1 = (item) => tmp1 += item;
      traverseDepth(tree, op1);
      expect(tmp1).toEqual('ABEFGCMRNSD');

      let tmp2 = [];
      const op2 = (item) => tmp2.push(item);
      traverseDepth(tree, op2);
      expect(tmp2).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);
    })

    it('performs breadth-first traversal', () => {
      function traverseBreadth<T>(tree: Tree<T>, op: Function): void {
        var queue: Node<T>[] = [tree];
        while (queue.length){
          var node: Node<T> = queue.shift();
          op(node.value);
          if (node.children){
            node.children.forEach(child => queue.push(child))
          }
        }
      }

      let tmp1 = '';
      const op1 = (item) => tmp1 += item;
      traverseBreadth(tree, op1);
      expect(tmp1).toEqual('ABCDEFGMNRS');

      let tmp2 = [];
      const op2 = (item) => tmp2.push(item);
      traverseBreadth(tree, op2);
      expect(tmp2).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);
    })

  })

  describe('with generators', () => {

    type StringTreeIterator = IterableIterator<string>;

    it('performs depth-first traversal', () => {
      function *iterateDepthFirst<T>(tree: Tree<T>){
        yield tree.value;
        if (tree.children){
          for (var i = 0; i < tree.children.length; i++){
            yield *iterateDepthFirst(tree.children[i])
          } 
        }
      }

      let iterator: StringTreeIterator;
      iterator = iterateDepthFirst(tree);
      expect([...iterator]).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);

      iterator = iterateDepthFirst(tree);
      expect(iterator.next().value).toEqual('A');
      expect(iterator.next().value).toEqual('B');
      expect(iterator.next().value).toEqual('E');
      expect(iterator.next().value).toEqual('F');
    })

    it('performs breadth-first traversal', () => {
      function *iterateBreadthFirst<T>(tree: Tree<T>){
        var queue = [tree]; // initially add root node
        while (queue.length){
          var node = queue.shift();
          yield node.value;
          if (node.children){
            node.children.forEach(child => queue.push(child))
          }
        }
      }

      let iterator: StringTreeIterator;
      iterator = iterateBreadthFirst(tree);
      expect([...iterator]).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);

      iterator = iterateBreadthFirst(tree);
      expect(iterator.next().value).toEqual('A');
      expect(iterator.next().value).toEqual('B');
      expect(iterator.next().value).toEqual('C');
      expect(iterator.next().value).toEqual('D');
    })

  })

})
