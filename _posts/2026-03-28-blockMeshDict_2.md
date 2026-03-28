## Introduction ##

Creating a blockMeshDict file often requires manually assigning vertex indices, which can be error-prone and difficult to scale for complex geometries. 

This post presents a structured approach to automatically generate vertex indices while ensuring a conditinous mesh across multiple blocks. 

## Baseline: Manual Vertex Indexing ##

Consider a simple case with two connected blocks. The back face of the first block matches the front face of the second block.  

The vertex index can be labeled manually, resulting 12 unique vertices. 


![Image](/assets/images/2026-03-29-blockMeshDict_2/post3_image1.png)


With this labeling, the *block* section in *blockMeshDict* is written as: 

```
blocks
(
    hex ( 0 1 4 3 6 7 10 9) (10 10 10) simpleGrading (1 1 1)
    hex ( 1 2 5 4 7 8 11 10) (10 10 10) simpleGrading (1 1 1)
);
```

While this works, manual indexing becomes tedious and error-probe as the number of blocks increases.  

## Alternative Approach: Local and Global Indexing ##

To simplify the process, we can assign indices programmatically using two systems. 

- **Local index** : A fixed ordering of vertices within each block (same for all blocks)
- **Global index** : A running index assigned across all blocks

![Image](/assets/images/2026-03-29-blockMeshDict_2/post3_image2.png)

For example:
- Block 1 uses global indices 0-7
- Block 2 uses global indices 8-15

This leads to:

```
blocks
(
    hex ( 0 1 2 3 4 5 6 7) (10 10 10) simpleGrading (1 1 1)
    hex ( 8 9 10 11 12 13 14 15) (10 10 10) simpleGrading (1 1 1)
);
```

However, for this arrangement, we get two disconnected meshes. The vertices are repeated e.g. 1-8, 5-12 6-15 and 3-11. To make a single mesh, repeated verex must be merged.  

## Solution: Remove Duplicate Vertices ##

Verices are compared based on their coordinates. Duplicate vertices are merged into a single unique index. 

To do this, two maps are created. The 1st map is to map the local vertex index to the global index. 

```
block 1 local index 0 <-> global index 0
block 1 local index 1 <-> global index 1
...
block 1 local index 7 <-> global index 7
block 2 local index 0 <-> global index 8
block 2 local index 1 <-> global index 9
...
block 2 local index 7 <-> global index 11
```

As the global index is repeated, we can sort it based on the vertex coordinates. A new table for unique index is created and a new map between the golable index and unique index. 

```
unique index 0 <-> global index 0
unique index 1 <-> global index 1
unique index 2 <-> global index 2
unique index 3 <-> global index 3
unique index 4 <-> global index 4
unique index 5 <-> global index 5
unique index 6 <-> global index 6
unique index 7 <-> global index 7
*unique index 1 <-> global index 8   (this is repeated)
unique index 8 <-> global index 9 
unique index 9 <-> global index 10
*unique index 2 <-> global index 11   (this is repeated)
*unique index 5 <-> global index 12   (this is repeated)
unique index 10 <-> global index 13
unique index 11 <-> global index 14
*unique index 6 <-> global index 15   (this is repeated)
```

By mapping the local index to the global index, and then to the unique index, the correct *block* section becomes.

```
blocks
(
    hex ( 0 1 2 3 4 5 6 7) (10 10 10) simpleGrading (1 1 1)
    hex ( 1 8 9 2 5 10 11 6) (10 10 10) simpleGrading (1 1 1)
);
```
Now, the block share vertices correctly, resuling in a single mesh.  

![Image](/assets/images/2026-03-29-blockMeshDict_2/post3_image3.png)

## Summary ##

This approach eliminates the need for manual vertex indexing in *blockMeshDict* and provides a systematic way to generate consistent, connected meshes. 

It is especially useful for automated workflows and large multi-block geometries, where manual indexing becomes impractical. 
